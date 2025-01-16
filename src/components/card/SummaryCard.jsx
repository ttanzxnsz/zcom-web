//rafce
import { useState, useEffect } from 'react'
import { listUserCart, saveAddress } from '../../api/user'
import useEcomStore from '../../../store/zcom-store'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { numberFormat } from '../../utils/number'

const SummaryCard = () => {
  // Javascript
  const token = useEcomStore((state) => state.token)
  const [products, setProducts] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  const [address, setAddress] = useState('')
  const [addressSaved, setAddressdSaved] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // code
    handleGetUserCart(token)
  }, [])

  const handleGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res)
        setProducts(res.data.products)
        setCartTotal(res.data.cartTotal)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSaveAddress = () => {
    // console.log(address)
    if (!address) {
      return toast.warning('Please Fill Address')
    }
    saveAddress(token, address)
      .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        setAddressdSaved(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning('Please Fill Address Sir')
    }
    navigate('/user/payment')
  }

  console.log(products)

  return (
    <div className="mx-auto">
      <div className="flex gap-4">
        {/* Row 1 */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4  rounded-md border shadow-md space-y-4">
            <h1 className="font-bold text-lg">Address Delivery</h1>
            <textarea required onChange={(e) => setAddress(e.target.value)} placeholder="Please Fill Up Address " className="w-full px-2  rounded-md" />
            <button onClick={handleSaveAddress} className="bg-blue-chelsea text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-night-blue hover:scale-105 hover:translate-y-1 hover:duration-200">
              Save Address
            </button>
          </div>
        </div>
        {/* Row 2 */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-lg font-bold">Summary</h1>

            {/* Item List */}
            {products?.map((item, index) => (
              <div key={{ index }}>
                {/* Left Corner */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">
                      {item.count} x {numberFormat(item.product.price)}
                    </p>
                  </div>
                  {/* Right Corner  */}
                  <div>
                    <p className="text-blue-chelsea font-bold">{numberFormat(item.count * item.product.price)}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Delivery  */}
            <div>
              <div className="flex justify-between">
                <p>Delivery</p>
                <p className="text-green-700 font-bold">0.00</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-red-700 font-bold">0.00</p>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">Amount</p>
                <p className="text-blue-chelsea font-bold text-lg">{numberFormat(cartTotal)}</p>
              </div>
            </div>

            <hr />
            <div>
              <button onClick={handleGoToPayment} className="bg-blue-chelsea w-full p-2 rounded-md text-white shadow-md hover:bg-blue-chelsea hover:scale-105 hover: duration-200">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
