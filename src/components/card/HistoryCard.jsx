//rafce
import { useState, useEffect } from 'react'
import { getOrders } from '../../api/user'
import useEcomStore from '../../../store/zcom-store'
import { dateFormat } from '../../utils/dateformat'
import { numberFormat } from '../../utils/number'

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token)
  console.log(token)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    // code
    handlegetOrders(token)
  }, [])

  const handlegetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        console.log(res)
        setOrders(res.data.orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Not Process':
        return 'bg-gray-700'
      case 'Processing':
        return 'bg-blue-400'
      case 'Completed':
        return 'bg-green-700'
      case 'Cancelled':
        return 'bg-red-700'
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Purchase History </h1>
      {/* Frame */}
      <div className="space-y-4">
        {/* Card */}
        {orders?.map((item, index) => {
          // console.log(item)
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* Header */}
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Order Date</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>{item.orderStatus}</span>
                </div>
              </div>
              {/* Table */}
              <div>
                <table className="border w-full">
                  <tr className="bg-gray-200">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th>Total</th>
                  </tr>

                  <tbody>
                    {item?.products?.map((product, index) => {
                      console.log(product)
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{numberFormat(product.product.price)}</td>
                          <td>{product.count}</td>
                          <td>{numberFormat(product.count * product.product.price)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div>
                <div className="text-right">
                  <p>Amount</p>
                  <p>{numberFormat(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryCard
