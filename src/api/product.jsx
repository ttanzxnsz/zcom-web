//Import
import axios from 'axios'

//@ENDPOINT https://zcom-api.vercel.app/api/product/
//@ENDPOINT https://zcom-api.vercel.app/api/products/
//@ENDPOINT https://zcom-api.vercel.app/api/images/
//@ENDPOINT https://zcom-api.vercel.app/api/removeimages
//@ENDPOINT https://zcom-api.vercel.app/api/search/filters

export const createProduct = async (token, form) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/product/', form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const listProduct = async (count = 20) => {
  //code
  return axios.get('https://zcom-api.vercel.app/api/products/' + count)
}

export const readProduct = async (token, id) => {
  //code
  return axios.get('https://zcom-api.vercel.app/api/product/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const deleteProduct = async (token, id) => {
  //code
  return axios.delete('https://zcom-api.vercel.app/api/product/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateProduct = async (token, id, form) => {
  //code
  return axios.put('https://zcom-api.vercel.app/api/product/' + id, form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const uploadFiles = async (token, form) => {
  //code
  // console.log('from api frontent', form)
  return axios.post(
    'https://zcom-api.vercel.app/api/images/',
    {
      image: form
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const removeFiles = async (token, public_id) => {
  //code
  // console.log('from api frontent', form)
  return axios.post(
    'https://zcom-api.vercel.app/api/removeimages',
    {
      public_id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export const searchFilters = async (arg) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/search/filters', arg)
}

export const listProductBy = async (sort, order, limit) => {
  //code
  return axios.post('https://zcom-api.vercel.app/api/productby', { sort, order, limit })
}
