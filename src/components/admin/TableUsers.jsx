//rafce
import { useState, useEffect } from 'react'
import { getListAllUsers } from '../../api/admin'
import useEcomStore from '../../../store/zcom-store'
import { changeUserStatus, changeUserRole } from '../../api/admin'
import { toast } from 'react-toastify'

const TableUsers = () => {
  const token = useEcomStore((state) => state.token)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // code
    handleGetUsers(token)
  }, [])

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeUserStatus = (userId, userStatus) => {
    console.log(userId, userStatus)
    const value = {
      id: userId,
      enabled: !userStatus
    }
    changeUserStatus(token, value)
      .then((res) => {
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Status Success')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeUserRole = (userId, userRole) => {
    console.log(userId, userRole)
    const value = {
      id: userId,
      role: userRole
    }
    changeUserRole(token, value)
      .then((res) => {
        console.log(res)
        handleGetUsers(token)
        toast.success('Update Role Success')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-blue-950 border text-white">
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Last Edit Date
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users?.map((el, i) => (
              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {el.id}
                </th>
                <td className="px-6 py-4">{el.email}</td>
                <td className="px-6 py-4">{el.updatedAt}</td>
                <td className="px-6 py-4">
                  <select onChange={(e) => handleChangeUserRole(el.id, e.target.value)} value={el.role}>
                    <option>user</option>
                    <option>admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">{el.enabled ? 'Active' : 'Inactive'}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleChangeUserStatus(el.id, el.enabled)} className="text-white bg-blue-950 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">
                    {el.enabled ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableUsers
