import axios from 'axios'
import FormData from 'form-data'
import config from './config'

export const ipfsGetFile = async (fileHash: string): Promise<any> => {
  const response = await axios.get(
    `https://gateway.pinata.cloud/ipfs/${fileHash}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )

  let data = null

  if (response && response.data) {
    data = response.data
  }

  return data
}

export const ipfsPostFile = async (
  formData: FormData
): Promise<string | null> => {
  const response = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
      maxContentLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data; boundary="${formData.getBoundary()}"`,
        pinata_api_key: config.pinata.key,
        pinata_secret_api_key: config.pinata.secret
      }
    }
  )

  let result = null

  if (response.data.IpfsHash) {
    result = response.data.IpfsHash
  }

  return result
}
