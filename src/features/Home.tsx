import { dashboardPath } from 'lib/constants';
import { cn } from 'lib/utils';
import { ChevronRight, HelpCircle, MessageSquare, Search } from 'lucide-react';
import { Link } from 'react-router';
const cards = [
  {
    header: 'Quyền riêng tư và cá nhân hóa',
    content:
      'Xem dữ liệu trong Tài khoản Google của bạn và chọn hoạt động sẽ được lưu để cá nhân hóa trải nghiệm của bạn trên Google',
    img: 'https://www.gstatic.com/identity/boq/accountsettingsmobile/dataandpersonalization_icon_192x192_36c8f2f8cd284ca9567f6dad397345a4.png',
    mimg: '',
    footer: 'Quản lý dữ liệu và quyền riêng tư của bạn',
    isFullWidth: false,
    link: dashboardPath.personalInfo,
  },
  {
    header: 'Chúng tôi có một số đề xuất bảo mật dành cho bạn',
    content: 'Công cụ Kiểm tra bảo mật có một số hành động để xuất cho bạn',
    img: 'https://www.gstatic.com/identity/boq/accountsettingsmobile/securitycheckup_yellow_with_new_shield_192x192_9b1684d5909a977b13e67a51366de0cb.png',
    mimg: '',
    footer: 'Bảo vệ tài khoản của bạn',
    isFullWidth: false,
    link: dashboardPath.security,
  },
  {
    header: 'Chúng tôi có các đề xuất về quyền riêng tư dành cho bạn',
    content:
      'Thực hiện quy trình Kiểm tra quyền riêng tư và chọn các chế độ cài đặt phù hợp với bạn',
    img: 'https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_with_new_shield_632x224_193d7aeb9c5bebe73373738aec30a185.png',
    mimg: 'https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_initial_with_new_shield_192x192_fcd51bc634485b4693b9b24ae4c32c80.png',
    footer: 'Xem các đề xuất (3)',
    isFullWidth: true,
    link: dashboardPath.settings,
  },
];
const Pages = () => {
  return (
    <>
      <div className="text-center mb-6">
        <div className="mx-auto md:my-8 bg-purple-700 text-white font-bold text-6xl rounded-full h-24 w-24 flex items-center justify-center">
          D
        </div>
        <h1 className="text-2xl md:text-3xl font-medium mb-4">
          Xin chào, Duy!
        </h1>
        <p className="text-gray-600 mb-6">
          Quản lý thông tin, quyền riêng tư và chế độ bảo mật cho tài khoản của
          bạn
        </p>
      </div>
      {/* Search box */}
      <div className="bg-gray-100 rounded-full flex items-center px-4 py-3 mb-6 focus-within:bg-white! focus-within:focus_inp">
        <Search className="text-black mr-3" />
        <input
          type="text"
          placeholder="Tìm trong Tài khoản Google"
          className="flex-1 bg-transparent outline-none"
        />
      </div>
      {/* Quick links */}
      <div className=":uno: flex flex-wrap gap-4 mb-6 text-black font-medium [&_button]:(rounded-md cursor-pointer border-primary text-primary border)">
        <button type="button" className="px-4 py-1 text-sm focus:outline-none">
          Mật khẩu của tôi
        </button>
        <button type="button" className="px-4 py-1 text-sm focus:outline-none">
          Thiết bị
        </button>
        <button type="button" className="px-4 py-1 text-sm focus:outline-none">
          Trình quản lý mật khẩu
        </button>
        <button type="button" className="px-4 py-1 text-sm focus:outline-none">
          Hoạt động của tôi
        </button>
        <button type="button" className="px-4 py-1 text-sm focus:outline-none">
          Email
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {cards.map((card) => (
          <Link
            to={card.link}
            className={cn(
              'card cursor-pointer flex flex-col',
              card.isFullWidth ? 'md:col-span-2' : '',
            )}
            key={card.link}
          >
            <div className="flex p-6 pb-3 flex-1">
              <div className="flex-1">
                <h2 className="md:text-2xl text-xl mb-2">{card.header}</h2>
                <p className="text-gray-600 mb-4 text-sm">{card.content}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div
                  className={cn(
                    'flex items-center justify-center h-full',
                    card.isFullWidth ? 'md:w-full w-24 max-w-[300px]' : 'w-24',
                  )}
                >
                  <img
                    // src={card.img}
                    srcSet={`${card.mimg || card.img} 700w, ${card.img} 1000w`}
                    alt="Privacy icon"
                    className="m-auto"
                  />
                </div>
              </div>
            </div>
            <div className="card-footer px-6 py-2 border-t border-gray-200 hover:bg-gray-50">
              <p className="text-blue-600 text-sm font-medium">{card.footer}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Looking for more information */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">
          Bạn đang tìm thông tin khác?
        </h2>
        {/* <div className="border border-gray-300 rounded-lg p-2 flex items-center mb-4">
              <FiSearch className="text-gray-400 mx-2" />
              <input
                type="text"
                placeholder="Tìm trong Tài khoản Google"
                className="flex-1 outline-none"
              />
              <button className="text-gray-400">
                <FiChevronRight />
              </button>
            </div> */}
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
          <Search className="text-gray-400 mr-4" size={16} />
          <span className="text-sm">Tìm trong Tài khoản Google</span>
          <ChevronRight className="text-gray-400 ml-auto" size={16} />
        </div>
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
          <HelpCircle className="text-gray-400 mr-4" size={16} />
          <span className="text-sm">Xem các lựa chọn trợ giúp</span>
          <ChevronRight className="text-gray-400 ml-auto" size={16} />
        </div>
        <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
          <MessageSquare className="text-gray-400 mr-4" size={16} />
          <span className="text-sm">Gửi ý kiến phản hồi</span>
          <ChevronRight className="text-gray-400 ml-auto" size={16} />
        </div>
      </div>
    </>
  );
};

export default Pages;
