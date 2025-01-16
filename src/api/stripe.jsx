//Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/user/create-payment-intent

export const payment = async (token) =>
  await axios.post(
    'https://zcom-api.vercel.app/api/user/create-payment-intent',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
