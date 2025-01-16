//rafce
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from 'zxcvbn'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid Email' }),
    password: z.string().min(10, { message: 'Password must be at least 10 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, { message: 'Password is not match', path: ['confirmPassword'] })

const Register = () => {
  //Javascript

  const [passwordScore, setPasswordScore] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const vaildatePassword = () => {
    let password = watch().password
    return zxcvbn(password ? password : '').score
  }

  useEffect(() => {
    // code
    setPasswordScore(vaildatePassword())
  }, [watch().password])

  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  //   confirmPassword: ''
  // })

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score

    // if (passwordScore < 3) {
    //   toast.warning('Password has not strong')
    //   return
    // }
    // console.log('Okay')
    try {
      //code
      const res = await axios.post('https://zcom-api.vercel.app/api/register', data)

      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      //err
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }

  // const tan = Array.from(Array(5))
  // console.log(tan)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              {/* <input className="border" onChange={handleOnChange} name="email" type="email" /> */}
              <input {...register('email')} placeholder="Email" className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-chelsea focus:border-transparent ${errors.email && 'border-red-500'}`} />
              {errors.email && <p className="text-red-700 font-bold text-sm">{errors.email.message}</p>}
            </div>
            <div>
              {/* <input className="border" onChange={handleOnChange} name="password" type="text" /> */}
              <input {...register('password')} placeholder="Password" type="password" className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-chelsea focus:border-transparent ${errors.password && 'border-red-500'}`} />
              {errors.password && <p className="text-red-700 font-bold text-sm">{errors.password.message}</p>}
              {watch().password?.length > 0 && (
                <div className=" flex rounded-md mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span key={index} className="w-1/5 px-1 py-2">
                      <div
                        className={`h-2 ${passwordScore <= 2 ? 'bg-red-500' : passwordScore < 4 ? 'bg-yellow-400' : 'bg-green-500'}       
                      `}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              {/* <input className="border" onChange={handleOnChange} name="confirmPassword" type="text" /> */}
              <input {...register('confirmPassword')} placeholder="Confirm Password" type="password" className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-chelsea focus:border-transparent ${errors.confirmPassword && 'border-red-500'}`} />
              {errors.confirmPassword && <p className="text-red-700 font-bold text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <button type="text" className="text-white bg-blue-chelsea hover:bg-blue-night-blue focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
