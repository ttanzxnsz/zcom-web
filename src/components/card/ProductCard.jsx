//rafce
import 'react'
import { ShoppingCart } from 'lucide-react'
import useEcomStore from '../../../store/zcom-store'
import { numberFormat } from '../../utils/number'
import { motion } from 'framer-motion'

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart)

  // console.log(item)
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5
      }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="border rounded-md shadow-md p-2 w-36">
        <div>{item.images && item.images.length > 0 ? <img src={item.images[0].url} className="w-full h-24 object-cover hover:scale-110 hover:duration-200 rounded-md" /> : <div className="w-full h-24 text-white text-center flex items-center shadow-md  justify-center font-bold bg-gray-700 rounded-md">No Image</div>}</div>

        <div className="py-2">
          <p className="text-sm font-bold truncate">{item.title}</p>
          <p className="text-sm text-yellow-500 font-bold truncate">{item.description}</p>
        </div>

        <div className="flex justify-between items-center ">
          <span className="text-sm font-bold text-blue-chelsea">{numberFormat(item.price)}</span>
          <button onClick={() => actionAddtoCart(item)} className="bg-blue-300 rounded-md shadow-md p-2 hover:bg-blue-chelsea">
            <ShoppingCart />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
