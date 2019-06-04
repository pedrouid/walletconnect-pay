import path from 'path'
import fs from 'fs'
import pump from 'pump'
import fastify from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import log from 'fastify-log'
import _static from 'fastify-static'
import multipart from 'fastify-multipart'
import FormData from 'form-data'
import config from './config'
import { ipfsGetFile, ipfsPostFile } from './pinata'
import { sendVerifyEmail } from './mailgun'
import { uuid, appendToFileName, resizeImage, deleteFile } from './utilities'

interface IEmailVerification {
  id: string
  email: string
  expires: number
}

const emailVerifications: IEmailVerification[] = []

const app = fastify({ logger: config.debug })

app.register(helmet)
app.register(cors, { origin: config.env === 'development' })
app.register(multipart)
app.register(log)
app.register(_static, { root: config.clientPath, wildcard: false })

function processUpload (req: any, res: any): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.mkdir(
      config.tempPath,
      { recursive: true },
      (err: NodeJS.ErrnoException | null) => {
        if (err) {
          reject(err)
        }
        let filePath = ''
        req.multipart(
          (field: any, file: any, fileName: any) => {
            fileName = appendToFileName(fileName, `-${Date.now()}`)
            filePath = path.join(config.tempPath, fileName)
            pump(file, fs.createWriteStream(filePath))
          },
          async (err: Error) => {
            if (err) {
              reject(err)
            }

            const maximum = 500 // resize images to 500px max

            filePath = await resizeImage(filePath, maximum)

            resolve(filePath)
          }
        )
      }
    )
  })
}

app.post('/ipfs', async (req: any, res) => {
  try {
    const filePath = await processUpload(req, res)

    let data = new FormData()

    data.append('file', fs.createReadStream(filePath))

    const result = await ipfsPostFile(data)

    res.status(200).send({
      success: true,
      result
    })

    await deleteFile(filePath)
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('/ipfs', async (req, res) => {
  const fileHash = req.query.fileHash

  if (!fileHash || typeof fileHash !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid fileHash parameter'
    })
  }

  try {
    const file = await ipfsGetFile(fileHash)

    res.status(200).send({
      success: true,
      result: file
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.post('/send-email', async (req, res) => {
  const { email } = req.body
  const id = uuid()

  emailVerifications.push({
    id,
    email,
    expires: Date.now() + 1800000 // 30mins
  })

  try {
    const result = await sendVerifyEmail(email, id)

    res.status(200).send({
      success: true,
      result
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.post('/verify-email', async (req, res) => {
  const { email, id } = req.body

  try {
    const matches = emailVerifications.filter(
      verification => verification.email === email && verification.id === id
    )

    if (matches && matches.length) {
      const now = Date.now()
      const emailVerification = matches[0]
      if (emailVerification.expires < now) {
        res.status(200).send({
          success: true,
          result: true
        })
      } else {
        res.status(406).send({
          success: false,
          error: 'Not Acceptable',
          message: 'Email Verification Expired'
        })
      }
    } else {
      res.status(404).send({
        success: false,
        error: 'Not Found',
        message: 'No Matching Email Verifications'
      })
    }
  } catch (error) {
    console.error(error)

    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

app.get('*', function (req, res: any) {
  res.sendFile('index.html')
})

app.listen(config.port, (err, address) => {
  if (err) {
    throw err
  }
})
