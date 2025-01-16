//rafce
import 'react'
import { Outlet } from 'react-router-dom'
import MainNav from '../components/MainNav'

const Layout = () => {
  return (
    <div>
      <MainNav />
      <h1></h1>
      <main className="h-full px-4 mt-2 mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
