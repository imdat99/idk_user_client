import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

const HomeLayout = () => {
  return (
    <>
        <Header />
        <div className="flex-1">
        <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default HomeLayout