import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import { getOrderAdmin, changeOrderStatus } from '../../api/admin'
import { toast } from 'react-toastify'
import { numberFormat } from '../../utils/number'
import { dateFormat } from '../../utils/dateformat'
import $ from 'jquery'
import 'datatables.net-bs4'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'

const TableOrders = () => {
  const token = useEcomStore((state) => state.token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    handleGetOrder(token)
  }, [token])

  useEffect(() => {
    let table
    if (orders.length > 0) {
      table = $('#TableOrders').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        responsive: true,
        destroy: true,
        language: {
          search: 'Search:',
          lengthMenu: 'Show _MENU_ entries',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          paginate: {
            first: 'First',
            last: 'Last',
            next: 'Next',
            previous: 'Previous'
          }
        }
      })
    }

    return () => {
      if (table) {
        table.destroy()
      }
    }
  }, [orders])

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
      <div className="relative overflow-x-auto">
        <table id="TableOrders" className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr className="bg-blue-950 text-white">
              <th className="px-6 py-3">NO</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={item.id} className="bg-white border-b">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <p>{item.orderedBy.email}</p>
                  <p>{item.orderedBy.address}</p>
                </td>
                <td className="px-6 py-4">{dateFormat(item.createdAt)}</td>
                <td className="px-6 py-4">
                  {item.products.map((product, idx) => (
                    <li key={idx}>
                      {product.product.title} {product.count} x {numberFormat(product.product.price)}
                    </li>
                  ))}
                </td>
                <td className="px-6 py-4">{numberFormat(item.cartTotal)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-white ${getStatusColor(item.orderStatus)}`}>{item.orderStatus}</span>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TableOrders
