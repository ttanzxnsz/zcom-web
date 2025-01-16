//Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/category/

export const createCategory = async (token, form) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/category', form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const listCategory = async () => {
  //code
  return axios.get('https://zcom-api.vercel.app/api/category')
}

export const removeCategory = async (token, id) => {
  //code
  return axios.delete('https://zcom-api.vercel.app/api/category/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
