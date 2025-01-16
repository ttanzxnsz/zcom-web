//rafce
import 'react'
import Content from '../components/home/Content'
import BestSeller from '../components/home/BestSeller'
import NewProduct from '../components/home/NewProduct'

const Home = () => {
  return (
    <div>
      <Content />

      <p className="text-2xl text-center my-4 font-semibold">Best Seller</p>
      <BestSeller />

      <p className="text-2xl text-center my-4 font-semibold">New Product</p>
      <NewProduct />
    </div>
  )
}

export default Home
