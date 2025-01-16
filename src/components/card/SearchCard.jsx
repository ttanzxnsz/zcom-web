//rafce
import { useState, useEffect } from 'react'
import useEcomStore from '../../../store/zcom-store'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { numberFormat } from '../../utils/number'

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct)
  const products = useEcomStore((state) => state.products)
  const actionSearchFilters = useEcomStore((state) => state.actionSearchFilters)

  const getCategory = useEcomStore((state) => state.getCategory)
  const categories = useEcomStore((state) => state.categories)

  const [text, setText] = useState('')
  const [categorySelected, setCategorySelected] = useState([])
  const [price, setPrice] = useState([50, 30000])
  const [ok, setOk] = useState(false)

  //   console.log(categories)
  useEffect(() => {
    getCategory()
  }, [])

  // Search Text
  //   console.log(text)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text })
      } else {
        getProduct()
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [text])

  // Search Category
  const handleCheck = (e) => {
    // console.log(e.target.value)
    const inCheck = e.target.value
    const inState = [...categorySelected]
    const findCheck = inState.indexOf(inCheck)

    if (findCheck === -1) {
      inState.push(inCheck)
    } else {
      inState.splice(findCheck, 1)
    }
    setCategorySelected(inState)

    if (inState.length > 0) {
      actionSearchFilters({ category: inState })
    } else {
      getProduct()
    }
  }
  console.log(categorySelected)

  // Search Price
  useEffect(() => {
    // code
    actionSearchFilters({ price })
  }, [ok])

  const handlePrice = (value) => {
    console.log(value)
    setPrice(value)

    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Search Producct</h1>
      {/* Search Text */}
      <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Search Product..." className="border rounded-md w-full mb-4 px-2 font-semibold text-black" />
      <hr />
      {/* Search Category */}
      <div>
        <h1 className="text-xl font-bold mb-4 ">Category</h1>
        <div>
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <br />
      {/* Search Price */}
      <div>
        <h1 className="text-xl font-bold mb-4">Search Price</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {numberFormat(price[0])}</span>
            <span>Max : {numberFormat(price[1])}</span>
          </div>

          <Slider onChange={handlePrice} range min={0} max={100000} defaultValue={[50, 500000]} />
        </div>
      </div>
    </div>
  )
}

export default SearchCard
