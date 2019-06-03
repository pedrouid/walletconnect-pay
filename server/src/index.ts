import fastify from 'fastify'
import path from 'path'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import config from './config'
import { ipfsGetFile, ipfsPostFile } from './pinata'
import { sendVerifyEmail } from './mailgun'
import { uuid } from './utilities'

interface IEmailVerification {
  id: string
  email: string
  expires: number
}

const emailVerifications: IEmailVerification[] = []

const app = fastify({ logger: config.debug })

app.register(helmet)
app.register(cors)

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../../client/build'),
  wildcard: false
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

app.post('/ipfs', async (req, res) => {
  try {
    const response = await ipfsPostFile(req.body)

    res.status(200).send({
      success: true,
      result: response
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
    const response = await sendVerifyEmail(email, id)

    res.status(200).send({
      success: true,
      result: response
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
  console.log(`Server listening on ${address}`)
})
