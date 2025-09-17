
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
            <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <img src="/assets/images/file-white.svg" alt="logo" className="h-10" />
                    </div>
                    <p className="text-gray-400 mb-6">
                        Nền tảng ôn thi Đại học hàng đầu Việt Nam với công nghệ hiện đại và phương pháp giảng dạy tiên tiến.
                    </p>
                    
                </div>

            <div className="border-t border-gray-800 mt-4 pt-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">© 2023 EduCheap. Tất cả quyền được bảo lưu.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-all">Điều khoản sử dụng</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-all">Chính sách bảo mật</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-all">Câu hỏi thường gặp</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer