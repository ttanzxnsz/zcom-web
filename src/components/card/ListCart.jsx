// rafce
import 'react'
import { ListCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserCart } from '../../api/user'
import { toast } from 'react-toastify'
import useEcomStore from '../../../store/zcom-store'
import { numberFormat } from '../../utils/number'

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts)
  const user = useEcomStore((s) => s.user)
  const token = useEcomStore((s) => s.token)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)

  const navigate = useNavigate()

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res)
        toast.success('Add To Cart Success', {
          position: 'top-center'
        })
        navigate('/checkout')
      })
      .catch((err) => {
        console.log('err', err)
        toast.warning(err.response.data.message)
      })
  }

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <ListCheck size={36} />
        <p className="text-2xl font-bold">List Product {cart.length} List</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Corner Row 1 */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
              {/* Row 1 */}
              <div className="flex justify-between mb-2">
                {/* Left Corner Row 2 */}
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img className="w-16 h-16 rounded-md" src={item.images[0].url} />
                  ) : (
                    <div
                      className="w-16 h-16 bg-gray-200 
                            rounded-md flex text-center items-center"
                    >
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">
                      {numberFormat(item.price)}x{item.count}
                    </p>
                  </div>
                </div>
                {/* Right Corner Row 1*/}
                <div>
                  <div className="font-bold text-blue-chelsea">{numberFormat(item.price * item.count)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Corner Row 2 */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-2xl font-bold">Total</p>
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="text-2xl font-bold">{numberFormat(getTotalPrice())}</span>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className="bg-blue-chelsea w-full
                    rounded-md text-white py-2 shadow-md hover:bg-blue-night-blue
                    "
                >
                  Sold Buy
                </button>
              </Link>
            ) : (
              <Link to={'/login'}>
                <button
                  className="bg-blue-chelsea w-full
                    rounded-md text-white py-2 shadow-md hover:bg-blue-night-blue
                    "
                >
                  Login
                </button>
              </Link>
            )}

            <Link to={'/shop'}>
              <button
                className="bg-white w-full 
                    rounded-md text-blue-700 py-2 shadow-md hover:bg-gray-100
                    "
              >
                Edit Product
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCart
