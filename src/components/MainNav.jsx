//rafce
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEcomStore from '../../store/zcom-store'
import { ChevronDown } from 'lucide-react'

const MainNav = () => {
  // Javascript
  const carts = useEcomStore((s) => s.carts)
  const user = useEcomStore((s) => s.user)
  const logout = useEcomStore((s) => s.logout)
  // console.log(Boolean(user))

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [user])

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  console.log(carts.length)

  return (
    <nav className="bg-blue-chelsea">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6 ">
            <Link to={'/'} className="text-white 2xl font-bold">
              LOGO
            </Link>
            <Link to={'/'} end className="text-white px-4 py-2 flex items-center ">
              Home
            </Link>
            <Link to={'/shop'} className="text-white px-4 py-2 flex items-center ">
              Shop
            </Link>
            <Link to={'/cart'} className="text-white relative py-4">
              Cart
              {carts.length > 0 && <span className="absolute top-0  bg-blue-900 rounded-full px-2">{carts.length}</span>}
            </Link>
          </div>

          {user ? (
            <div style={{ zIndex: 50 }} className="flex items-center gap-4 text-white">
              <button onClick={toggleDropdown} className="flex items-center gap-2 px-2 py-3">
                <img className="w-8 h-8" src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-student-avatars-flat-icons-pack-people-456332.png?f=webp&w=512" />
                <ChevronDown />
              </button>

              {isOpen && (
                <div className="absolute mt-2 top-12 bg-white shadow-md text-black">
                  <Link to={'/user/history'} className="block px-4 py-2 hover:bg-blue-300">
                    History
                  </Link>
                  <button onClick={() => logout()} className="block px-4 py-2 hover:bg-blue-300">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={'/register'} className="text-white px-4 py-2 flex items-center ">
                Register
              </Link>
              <Link to={'/login'} className="text-white px-4 py-2 flex items-center ">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default MainNav
