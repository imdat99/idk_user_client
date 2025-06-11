import { ChevronRight } from 'lucide-react';

const PersonalInfo = () => {
  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-medium mb-4">
          Thông tin cá nhân
        </h1>
        <p className="text-gray-600 mb-6">
          Thông tin về bạn và các lựa chọn ưu tiên của bạn trên các dịch vụ của
          Google
        </p>
      </div>
      <div className="p-6 h-1" />
      <div className="bg-white mb-6">
        <div className="flex">
          <div className="flex-1">
            <h2 className="text-3xl mb-2">
              Thông tin trong hồ sơ của bạn trên các dịch vụ của Google
            </h2>
            <p className="text-gray-600 mb-4">
              Thông tin cá nhân và các tùy chọn giúp quản lý thông tin đó. Bạn
              có thể cho phép người khác nhìn thấy một số dữ liệu của thông tin
              này (chẳng hạn như thông tin liên hệ) để họ có thể dễ dàng liên hệ
              với bạn. Bạn cũng có thể xem thông tin tóm tắt về các hồ sơ của
              mình.
            </p>
          </div>
          <div className="ml-4">
            <div className="flex items-center justify-center h-full max-w-[360px]">
              <img
                src="https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_720x256_ee5ae234eb96dc206b79c851f41a6f69.png"
                alt="Privacy checkup icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card p-6 pb-0 mb-6">
        <div className="mb-5">
          <h2 className="text-xl mb-3 text-gray-800">Thông tin cơ bản</h2>
          <p className="text-gray-600 mb-4 text-sm">
            Những người khác sử dụng các dịch vụ của Google có thể nhìn thấy một
            số thông tin.{' '}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50">
            <span className="text-gray-600">Ảnh hồ sơ</span>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-2">
                LD
              </div>
              <ChevronRight className="text-2xl text-gray-400 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50">
            <span className="text-gray-600">Tên</span>
            <div className="flex items-center">
              <span className="mr-2">Lê Đạt</span>
              <ChevronRight className="text-2xl text-gray-400 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-4 hover:bg-gray-50">
            <span className="text-gray-600">Ngày sinh</span>
            <div className="flex items-center">
              <span className="mr-2">31 tháng 3, 1998</span>
              <ChevronRight className="text-2xl text-gray-400 ml-auto" />
            </div>
          </div>
          <div className="flex justify-between items-center pb-4 hover:bg-gray-50">
            <span className="text-gray-600">Giới tính</span>
            <div className="flex items-center">
              <span className="mr-2">Nam</span>
              <ChevronRight className="text-2xl text-gray-400 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
