// Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/admin/orders
//@ENDPOINT https://zcom-api.vercel.app/api/admin/order-status
//@ENDPOINT https://zcom-api.vercel.app/api/admin/users
//@ENDPOINT https://zcom-api.vercel.app/api/change-status

export const getOrderAdmin = async (token) => {
  //code
  return axios.get('https://zcom-api.vercel.app/api/admin/orders/', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeOrderStatus = async (token, orderId, orderStatus) => {
  //code
  return axios.put(
    'https://zcom-api.vercel.app/api/admin/order-status',
    { orderId, orderStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const getListAllUsers = async (token) => {
  //code
  return axios.get('https://zcom-api.vercel.app/api/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeUserStatus = async (token, value) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/change-status', value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const changeUserRole = async (token, value) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/change-role', value, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
