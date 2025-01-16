//rafce
import { useState } from 'react'
import { toast } from 'react-toastify'
import useEcomStore from '../../../store/zcom-store'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  //Javascript
  const navigate = useNavigate()
  const actionLogin = useEcomStore((state) => state.actionLogin)
  const user = useEcomStore((state) => state.user)
  console.log('user form zustand', user)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnChange = (e) => {
    //code
    // console.log(e.target.name, e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      console.log('role', role)
      roleRedirect(role)
      toast.success('Welcom Back', { position: 'top-center' })
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input placeholder="Email" className="border w-full px-3 py-2 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500  focus:border-transparent" onChange={handleOnChange} name="email" type="email" />
            <input placeholder="Password" className="border w-full px-3 py-2 rounded     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={handleOnChange} name="password" type="password" />
            <button type="text" className="text-white bg-blue-chelsea hover:bg-blue-night-blue focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
