//rafce
import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import { toast } from 'react-toastify'
import { createProduct, deleteProduct } from '../../api/product'
import UploadFile from './Uploadfile'
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const initialState = {
  title: '',
  description: '',
  price: 0,
  quantity: 0,
  categoryId: '',
  images: []
}

const FormProduct = () => {
  const token = useEcomStore((state) => state.token)
  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)
  // console.log(products)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '',
    images: []
  })

  useEffect(() => {
    //code
    getCategory()
    getProduct(20)
  }, [])
  // console.log(products)

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(form)
    try {
      //code
      const res = await createProduct(token, form)
      setForm(initialState)
      getProduct()
      toast.success(`Add Product ${res.data.title} Success`)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are u sure to Delete ?')) {
      try {
        //code
        const res = await deleteProduct(token, id)
        console.log(res)
        toast.success('Deleted Product Success')
        getProduct()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        <h1>Product Management</h1>
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
        <button className="text-white bg-blue-950 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Product</button>
        <hr />
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-blue-950 border text-white">
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Sold
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                // console.log(item)
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4">{item.images.length > 0 ? <img className=" w-full h-full rounded-lg shadow-md" src={item.images[0].url} /> : <div className="w-24 h-24 bg-gray-800 rounded-md flex items-center justify-center">No Images</div>}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4">{numberFormat(item.price)}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">{item.sold}</td>
                    <td className="px-6 py-4">{dateFormat(item.updatedAt)}</td>
                    <td className="px-6 py-4">
                      <p className="text-white bg-yellow-400 hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        <Link to={'/admin/product/' + item.id}>Edit </Link>
                      </p>
                      <p onClick={() => handleDelete(item.id)} className="text-white bg-red-700 hover:bg-blue-950 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Delete
                      </p>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  )
}

export default FormProduct
