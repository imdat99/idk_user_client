import { Star } from "lucide-react"
import { Checkbox } from 'primereact/checkbox';
        
const Course = () => {
  return (
    <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
  {/* Filters Sidebar */}
  <div className="lg:w-1/4 lg:pr-6 mb-8 lg:mb-0">
    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
      <h3 className="font-bold mb-4 text-lg">Bộ lọc</h3>
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Danh mục</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Toàn bộ khóa học</span>
            <span className="ml-auto text-gray-500 text-sm">(210)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
              defaultChecked={true}
            />
            <span className="ml-2 text-gray-700">Đang giảm giá</span>
            <span className="ml-auto text-gray-500 text-sm">(45)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Mới nhất</span>
            <span className="ml-auto text-gray-500 text-sm">(32)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Xem nhiều nhất</span>
            <span className="ml-auto text-gray-500 text-sm">(68)</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Môn học</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
              defaultChecked={true}
            />
            <span className="ml-2 text-gray-700">Toán học</span>
            <span className="ml-auto text-gray-500 text-sm">(42)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Vật lý</span>
            <span className="ml-auto text-gray-500 text-sm">(36)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Hóa học</span>
            <span className="ml-auto text-gray-500 text-sm">(38)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Tiếng Anh</span>
            <span className="ml-auto text-gray-500 text-sm">(45)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Ngữ Văn</span>
            <span className="ml-auto text-gray-500 text-sm">(28)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Sinh học</span>
            <span className="ml-auto text-gray-500 text-sm">(21)</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Mức giá</h4>
        <div className="price-filter">
          <input
            type="range"
            min={0}
            max={1000000}
            defaultValue={500000}
            className="range-slider mb-3"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>0đ</span>
            <span>500.000đ</span>
            <span>1.000.000đ</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Đánh giá</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
            />
            <div className="flex items-center ml-2">
              <div className="flex text-yellow-400 mr-2">
                <Star className="" />
                <Star className="" />
                <Star className="" />
                <Star className="" />
                <Star className="" />
              </div>
              <span className="text-gray-700">5 sao</span>
            </div>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
              defaultChecked={true}
            />
            <div className="flex items-center ml-2">
              <div className="flex text-yellow-400 mr-2">
                <Star className="" />
                <Star className="" />
                <Star className="" />
                <Star className="" />
                <Star className="" />
                <i className="far fa-star" />
              </div>
              <span className="text-gray-700">4 sao trở lên</span>
            </div>
          </label>
          <label className="flex items-center">
          <input
              type="checkbox"
              className="checkbox-item rounded text-primary-600 focus:ring-primary-500"
              defaultChecked={true}
            />
            <div className="flex items-center ml-2">
              <div className="flex text-yellow-400 mr-2">
                <Star size={16} className="fill-yellow-400" />
                <Star size={16} className="fill-yellow-400" />
                <Star size={16} className="fill-yellow-400" />
                <Star size={16} className="far fa-star" />
                <Star size={16} className="far fa-star" />
              </div>
              <span className="text-gray-700">3 sao trở lên</span>
            </div>
          </label>
        </div>
      </div>
      <button className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all">
        Áp dụng bộ lọc
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold mb-4">Khóa học nổi bật</h3>
      <div className="space-y-4">
        <div className="flex">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src="https://placehold.co/80x80/3a0ca3/FFFFFF/png?text=Toán"
              alt="Course"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-sm mb-1">Toán hình không gian</h4>
            <div className="flex items-center text-xs text-gray-500">
              <span>4.8</span>
              <Star className=" text-yellow-400 ml-1 text-xs" />
            </div>
            <div className="text-primary-600 font-semibold text-sm mt-1">
              599.000đ
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src="https://placehold.co/80x80/f72585/FFFFFF/png?text=Anh"
              alt="Course"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-sm mb-1">Tiếng Anh giao tiếp</h4>
            <div className="flex items-center text-xs text-gray-500">
              <span>4.9</span>
              <Star className=" text-yellow-400 ml-1 text-xs" />
            </div>
            <div className="text-primary-600 font-semibold text-sm mt-1">
              699.000đ
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src="https://placehold.co/80x80/4361ee/FFFFFF/png?text=Lý"
              alt="Course"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-medium text-sm mb-1">Vật lý lượng tử</h4>
            <div className="flex items-center text-xs text-gray-500">
              <span>4.7</span>
              <Star className=" text-yellow-400 ml-1 text-xs" />
            </div>
            <div className="text-primary-600 font-semibold text-sm mt-1">
              549.000đ
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Courses List */}
  <div className="lg:w-3/4">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold">Tất cả khóa học</h2>
        <p className="text-gray-600">Hiển thị 12 trên 210 khóa học</p>
      </div>
      <div className="flex items-center space-x-3 mt-4 md:mt-0">
        <span className="text-gray-600 text-sm">Sắp xếp theo:</span>
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option>Phổ biến nhất</option>
          <option>Đánh giá cao nhất</option>
          <option>Mới nhất</option>
          <option>Giá tăng dần</option>
          <option>Giá giảm dần</option>
        </select>
      </div>
    </div>
    {/* Subject Filters */}
    <div className="flex flex-wrap gap-3 mb-6">
      <a
        href="#"
        className="subject-badge bg-primary-700 text-white px-4 py-2 rounded-xl font-medium"
      >
        Tất cả
      </a>
      <a
        href="#"
        className="subject-badge bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium"
      >
        Toán học
      </a>
      <a
        href="#"
        className="subject-badge bg-red-100 text-red-700 px-4 py-2 rounded-xl font-medium"
      >
        Vật lý
      </a>
      <a
        href="#"
        className="subject-badge bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-medium"
      >
        Hóa học
      </a>
      <a
        href="#"
        className="subject-badge bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium"
      >
        Tiếng Anh
      </a>
      <a
        href="#"
        className="subject-badge bg-purple-100 text-purple-700 px-4 py-2 rounded-xl font-medium"
      >
        Ngữ Văn
      </a>
    </div>
    {/* Courses Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Course 1 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/4361ee/FFFFFF/png?text=Toán+Nâng+Cao"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Giảm 20%
          </div>
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 24h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              Toán học
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.9</span>
              <span className="text-gray-500 ml-1">(128)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Toán nâng cao - Bí quyết đạt 9+
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Làm chủ mọi dạng bài từ cơ bản đến nâng cao, bứt phá điểm số môn
            Toán.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Thầy Nguyễn Văn A</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                599.000đ
              </span>
              <span className="text-gray-400 line-through text-sm ml-2">
                749.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
      {/* Course 2 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/3a0ca3/FFFFFF/png?text=Vật+Lý"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 18h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
              Vật lý
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.8</span>
              <span className="text-gray-500 ml-1">(96)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Vật lý 12 - Master mọi dạng bài
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Hệ thống kiến thức Vật lý trọng tâm, phương pháp giải nhanh các dạng
            bài.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Cô Trần Thị B</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                549.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
      {/* Course 3 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/f72585/FFFFFF/png?text=Tiếng+Anh"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Bán chạy
          </div>
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 30h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
              Tiếng Anh
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.9</span>
              <span className="text-gray-500 ml-1">(215)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Tiếng Anh chuyên sâu - Mục tiêu 9 điểm
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Nắm vững ngữ pháp, từ vựng và kỹ năng làm bài Tiếng Anh thi Đại học.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Thầy John Smith</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                699.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
      {/* Course 4 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/4361ee/FFFFFF/png?text=Hóa+Học"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 22h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Hóa học
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.7</span>
              <span className="text-gray-500 ml-1">(87)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Hóa học hữu cơ - Phương pháp giải nhanh
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Nắm vững phương pháp giải nhanh các bài tập Hóa học hữu cơ.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Ts. Lê Văn C</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                579.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
      {/* Course 5 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/3a0ca3/FFFFFF/png?text=Ngữ+Văn"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Mới
          </div>
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 20h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Ngữ Văn
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.6</span>
              <span className="text-gray-500 ml-1">(64)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Ngữ Văn 12 - Nghị luận văn học đỉnh cao
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Phương pháp viết bài nghị luận văn học đạt điểm tối đa.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Cô Phạm Thị D</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                549.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
      {/* Course 6 */}
      <div className="border border-gray-100 bg-white rounded-xl overflow-hidden">
        <div className="relative">
          <img
            src="https://placehold.co/400x250/f72585/FFFFFF/png?text=Sinh+Học"
            alt="Course"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-white text-primary-600 text-xs font-bold px-2 py-1 rounded-lg">
            <i className="fas fa-clock mr-1" /> 16h
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
              Sinh học
            </span>
            <div className="flex items-center">
              <Star className=" text-yellow-400 mr-1" />
              <span className="font-medium">4.5</span>
              <span className="text-gray-500 ml-1">(52)</span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-3">
            Sinh học phân tử - Ứng dụng công nghệ cao
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Hiểu sâu về sinh học phân tử và các ứng dụng trong thực tiễn.
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                <img
                  src="https://placehold.co/40x40/3a0ca3/FFFFFF/png?text=GV"
                  alt="Teacher"
                />
              </div>
              <span className="text-sm font-medium">Ts. Nguyễn Văn E</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-primary-600 font-bold text-lg">
                649.000đ
              </span>
            </div>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700">
              <i className="fas fa-shopping-cart mr-1" /> Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Pagination */}
    <div className="flex justify-center">
      <nav className="flex items-center space-x-1">
        <a
          href="#"
          className="pagination-item w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          <i className="fas fa-chevron-left text-gray-600" />
        </a>
        <a
          href="#"
          className="pagination-item active w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          1
        </a>
        <a
          href="#"
          className="pagination-item w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          2
        </a>
        <a
          href="#"
          className="pagination-item w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          3
        </a>
        <a
          href="#"
          className="pagination-item w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          4
        </a>
        <a
          href="#"
          className="pagination-item w-10 h-10 rounded-lg flex items-center justify-center border border-gray-300"
        >
          5
        </a>
      </nav>
    </div>
  </div>
</main>

  )
}

export default Course