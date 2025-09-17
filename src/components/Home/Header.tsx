import { Menu, Search } from "lucide-react"
import { Button } from "primereact/button"
import { NavLink } from "react-router"
const listLinks = [
    {
        name: "Trang chủ",
        href: "#",
    },
    {
        name: "Khóa học",
        href: "#",
    },
    {
        name: "Lộ trình",
        href: "#",
    },
    {
        name: "Đề thi",
        href: "#",
    },
    {
        name: "Về chúng tôi",
        href: "#",
    },
]
const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
        <div className="backdrop-blur-[10px] bg-[rgba(255,255,255,0.9)] border-b border-gray-100">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">EduCheap</span>
                </div>

                <nav className="hidden lg:flex space-x-8">
                    {listLinks.map((link) => (
                        <NavLink to={link.href} key={link.name} className="font-medium text-gray-700 hover:text-blue-600 transition-all flex flex-col items-center group"> 
                            <span>{link.name}</span>
                            <div className="w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300 mt-1"></div>
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <button className="hidden md:flex items-center text-gray-400 hover:text-blue-600 cursor-pointer transition-all">
                        <Search className="mr-2" />
                        <span>Tìm kiếm</span>
                    </button>
                    <Button className="hidden md:flex">Đăng nhập</Button>
                    <button className="lg:hidden">
                        <Menu className="fas fa-bars text-xl text-gray-700"/>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header