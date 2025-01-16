//Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/user/cart
//@ENDPOINT https://zcom-api.vercel.app/api/user/address
//@ENDPOINT https://zcom-api.vercel.app/api/user/order

export const createUserCart = async (token, cart) => {
  // code
  return axios.post('https://zcom-api.vercel.app/api/user/cart', cart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const listUserCart = async (token) => {
  // code
  return axios.get('https://zcom-api.vercel.app/api/user/cart', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const saveAddress = async (token, address) => {
  // code
  return axios.post(
    'https://zcom-api.vercel.app/api/user/address',
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const saveOrder = async (token, payload) => {
  // code
  return axios.post('https://zcom-api.vercel.app/api/user/order', payload, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const getOrders = async (token) => {
  // code
  return axios.get('https://zcom-api.vercel.app/api/user/order', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
