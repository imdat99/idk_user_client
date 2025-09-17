import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

const HomeLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default HomeLayout