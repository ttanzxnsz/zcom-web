//Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/current-user
//@ENDPOINT https://zcom-api.vercel.app/api/current-admin

export const currentUser = async (token) =>
  await axios.post(
    'https://zcom-api.vercel.app/api/current-user',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

export const currentAdmin = async (token) => {
  return await axios.post(
    'https://zcom-api.vercel.app/api/current-admin',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}
