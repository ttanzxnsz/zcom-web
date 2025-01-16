//Import
import axios from 'axios'
import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'
import { listCategory } from '../src/api/category'
import { listProduct, searchFilters } from '../src/api/product'
import { isEqual, unionWith } from 'lodash'

const zcomStore = (set, get) => ({
  user: null,
  token: null,
  categories: [],
  products: [],
  carts: [],

  logout: () => {
    set({
      user: null,
      token: null,
      carts: []
    })
  },
  actionAddtoCart: (product) => {
    const carts = get().carts
    const updateCart = [...carts, { ...product, count: 1 }]

    // Uniqe
    const uniqe = unionWith(updateCart, isEqual)

    set({ carts: uniqe })
  },

  actionUpdateQuantity: (productId, newQuantity) => {
    // console.log('Upadate', productId, newQuantity)
    set((state) => ({
      carts: state.carts.map((item) => (item.id === productId ? { ...item, count: Math.max(1, newQuantity) } : item))
    }))
  },

  actionRemoveProduct: (productId) => {
    // console.log(productId)
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId)
    }))
  },

  getTotalPrice: () => {
    return get().carts.reduce((total, item) => {
      return total + item.price * item.count
    }, 0)
  },

  actionLogin: async (form) => {
    const res = await axios.post('https://zcom-api.vercel.app/api/login', form)
    set({
      user: res.data.payload,
      token: res.data.token
    })
    return res
  },
  getCategory: async () => {
    try {
      const res = await listCategory()
      set({ categories: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  getProduct: async (count) => {
    try {
      const res = await listProduct(count)
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  actionSearchFilters: async (arg) => {
    try {
      const res = await searchFilters(arg)
      set({ products: res.data })
    } catch (err) {
      console.log(err)
    }
  },
  clearCart: () => {
    set({ carts: [] })
  }
})

const usePersist = {
  name: 'zcom-store',
  storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(zcomStore, usePersist))

export default useEcomStore
