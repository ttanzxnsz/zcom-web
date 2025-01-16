import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import { toast } from 'react-toastify'
import { createCategory, removeCategory } from '../../api/category'

const FormCategory = () => {
  //Javascript
  const token = useEcomStore((state) => state.token)
  const [name, setName] = useState('')
  // const [categories, setCategories] = useState([])
  const categories = useEcomStore((state) => state.categories)
  const getCategory = useEcomStore((state) => state.getCategory)

  useEffect(() => {
    getCategory(token)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) {
      return toast.warning('Please Fill Data')
    }

    try {
      const res = await createCategory(token, { name })
      toast.success(`Add Category ${res.data.name} Success`)
      getCategory(token)
      setName('') // Reset input field after adding
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = async (id) => {
    if (!id) return toast.error('Invalid category ID')

    try {
      const res = await removeCategory(token, id)
      toast.success(`Deleted ${res.data.name} Success`)
      getCategory(token)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <input className="border" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter category name" />
        <button className="text-white bg-blue-950 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add Category</button>
      </form>

      <hr />

      <ul className="list-none">
        {categories.map((item, index) => (
          <li className="flex justify-between my-2" key={item.id || index}>
            <span>{item.name}</span>
            <button onClick={() => handleRemove(item.id)} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FormCategory
