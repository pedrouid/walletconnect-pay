import fastify from 'fastify'
import path from 'path'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import config from './config'
import { ipfsGetFile, ipfsPostFile } from './pinata'

const app = fastify({ logger: config.debug })

app.register(helmet)
app.register(cors)

app.register(require('fastify-static'), {
  root: path.join(__dirname, '../../client/build'),
  wildcard: false
})

app.get('/ipfs', async (req, res) => {
  const fileName = req.query.fileName

  if (!fileName || typeof fileName !== 'string') {
    res.status(500).send({
      success: false,
      error: 'Internal Server Error',
      message: 'Missing or invalid fileName parameter'
    })
  }

  try {
    const file = await ipfsGetFile(fileName)

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

app.get('*', function (req, res: any) {
  res.sendFile('index.html')
})

app.listen(config.port, (err, address) => {
  if (err) {
    throw err
  }
  console.log(`Server listening on ${address}`)
})
