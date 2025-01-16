//rafce
import 'react'
import { Trash2 } from 'lucide-react'
import useEcomStore from '../../../store/zcom-store'
import { Link } from 'react-router-dom'
import { numberFormat } from '../../utils/number'
const CartCard = () => {
  // Javascript
  const carts = useEcomStore((state) => state.carts)
  const actionUpdateQuantity = useEcomStore((state) => state.actionUpdateQuantity)
  const actionRemoveProduct = useEcomStore((state) => state.actionRemoveProduct)
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice)
  console.log(carts)

  return (
    <div>
      <h1 className="text 2xl font-bold">Cart Product</h1>
      <br />
      {/* Border */}
      <div>
        {/* Card */}
        {carts.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
            {/* Row 1 */}
            <div className="flex justify-between mb-2">
              {/* Left Corner Row 1 */}
              <div className="flex gap-2 items-center">
                {item.images && item.images.length > 0 ? <img className="w-24 h-24 rounded-md" src={item.images[0].url} /> : <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center text-black">No Image</div>}

                <div>
                  <p className="text-black font-bold">{item.title}</p>
                  <p className="text-black text-sm">{item.description}</p>
                </div>
              </div>
              {/* Right Corner Row 1 */}
              <div onClick={() => actionRemoveProduct(item.id)} className="text-red-600 p-2">
                <Trash2 />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex justify-between">
              {/* Left Corner Row 2 */}
              <div className="border rounded-sm px-2 py-1">
                <button onClick={() => actionUpdateQuantity(item.id, item.count - 1)} className="text-black px-2 py-1 bg-gray-200 rounded-sm hover:bg-red-500">
                  -
                </button>
                <span className="text-black px-4">{item.count}</span>
                <button onClick={() => actionUpdateQuantity(item.id, item.count + 1)} className="text-black px-2 py-1 bg-gray-200 rounded-sm hover:bg-blue-600">
                  +
                </button>
              </div>
              {/* Right Corner Row 2 */}
              <div className="text-blue-chelsea font-bold">{numberFormat(item.price * item.count)}</div>
            </div>
          </div>
        ))}
        {/* Total */}
        <div className="flex justify-between px-2 py-2">
          <span>Total</span>
          <span>{numberFormat(getTotalPrice())}</span>
        </div>
        <Link to="/cart">
          <button className="mt-4 bg-blue-chelsea text-white w-full py-2 rounded-md shadow-md hover:bg-blue-chelsea hover:scale-105 hover: duration-200">Buy Now</button>
        </Link>
      </div>
    </div>
  )
}

export default CartCard
