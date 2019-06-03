import axios, { AxiosInstance } from "axios";

export const apiPinFile = async (data: any): Promise<string | null> => {
  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    data,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY
      }
    }
  );

  let result = null;

  if (response.data.IpfsHash) {
    result = response.data.IpfsHash;
  }

  return result;
};

export const apiFetchFile = async (fileHash: string): Promise<any> => {
  const response = await axios.get(
    `https://gateway.pinata.cloud/ipfs/${fileHash}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );

  let data = null;

  if (response && response.data) {
    data = response.data;
  }

  return data;
};
