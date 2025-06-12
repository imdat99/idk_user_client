import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'

const NotfoundPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Helmet>
                <title>Trang không tìm thấy - 404</title>
                <meta name="description" content="Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ." />
            </Helmet>
            <div className="text-center p-8">
                <h1 className="text-9xl font-extrabold text-red-600">404</h1>
                <p className="text-2xl md:text-3xl font-light text-gray-800 mt-4">Ối! trang bạn tìm không có tồn tại.</p>
                <p className="mt-2 text-gray-500">Có thể là bạn đã gõ sai hoặc link này không còn tồn tại.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-lg shadow transition" replace>Về trang chủ</Link>
            </div>
        </div>
    )
}

export default NotfoundPage