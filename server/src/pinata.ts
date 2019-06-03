import axios from 'axios'
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

export const ipfsPostFile = async (data: any): Promise<string | null> => {
  const response = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
