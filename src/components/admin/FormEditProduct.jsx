//rafce
import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import { toast } from 'react-toastify'
import { createProduct, listProduct, readProduct, updateProduct } from '../../api/product'
import UploadFile from './Uploadfile'
import { useParams, useNavigate } from 'react-router-dom'

const initialState = {
  title: '',
  description: '',
  price: 0,
  quantity: 0,
  categoryId: '',
  images: []
}

const FormEditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const token = useEcomStore((state) => state.token)
  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  const [form, setForm] = useState(initialState)

  useEffect(() => {
    //code
    getCategory()
    fetchProduct(token, id, form)
  }, [])

  const fetchProduct = async (token, id, form) => {
    try {
      //code
      const res = await readProduct(token, id, form)
      console.log('res from backend', res)
      setForm(res.data)
    } catch (err) {
      console.log('Err fetch data', err)
    }
  }
  console.log(form)

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(form)
    try {
      //code
      const res = await updateProduct(token, id, form)
      toast.success(`Add Product ${res.data.title} Success`)
      navigate('/admin/product')
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>Edit Product Management</h1>
        <br />
        <input className="border" value={form.title} onChange={handleOnChange} placeholder="Title" name="title" />
        <input className="border" value={form.description} onChange={handleOnChange} placeholder="Description" name="description" />
        <input className="border" type="number" value={form.price} onChange={handleOnChange} placeholder="Price" name="price" />
        <input className="border" type="number" value={form.quantity} onChange={handleOnChange} placeholder="Quantity" name="quantity" />
        <select className="border" name="categoryId" onChange={handleOnChange} value={form.categoryId} required>
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />
        <br />

        {/* Upload File */}
        <UploadFile form={form} setForm={setForm} />

        <br />
        <button className="text-white bg-blue-950 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Update Product</button>
        <hr />
        <div className="relative overflow-x-auto"></div>
      </form>
    </div>
  )
}

export default FormEditProduct
