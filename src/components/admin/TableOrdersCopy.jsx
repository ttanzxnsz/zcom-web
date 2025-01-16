//rafce
import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'

const TableOrders = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // code
    handleGetOrder(token)
  }, [])

  const handleGetOrder = (token) => {
    getOrderAdmin(token)
      .then((res) => {
        setOrders(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then((res) => {
        console.log(res)
        toast.success('Update Status Suceess')
        handleGetOrder(token)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Process':
        return 'bg-gray-700 whitespace-nowrap'
      case 'Processing':
        return 'bg-blue-400'
      case 'Completed':
        return 'bg-green-700'
      case 'Cancelled':
        return 'bg-red-700'
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <div>
        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-blue-950 border text-white">
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
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
              {orders?.map((item, index) => {
                console.log(item)
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      <p>{item.orderedBy.email}</p>
                      <p>{item.orderedBy.address}</p>
                    </td>
                    <td className="px-6 py-4">{dateFormat(item.createdAt)}</td>
                    <td className="px-2 py-4">
                      {item.products?.map((product, index) => (
                        <li key={index}>
                          {product.product.title} {''}
                          <span className="text-sm">
                            {product.count} x {numberFormat(product.product.price)}
                          </span>
                        </li>
                      ))}
                    </td>

                    <td className="px-6 py-4">{numberFormat(item.cartTotal)}</td>
                    <td className="px-6 py-4">
                      <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full text-white`}>{item.orderStatus}</span>
                    </td>

                    <td className="px-6 py-4">
                      <select value={item.orderStatus} onChange={(e) => handleChangeOrderStatus(token, item.id, e.target.value)}>
                        <option>Not Process</option>
                        <option>Processing</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableOrders
