import { dashboardPath } from 'lib/constants';
import { cn } from 'lib/utils';
import { CreditCard, Home, Info, Lock, User } from 'lucide-react';
import { forwardRef } from 'react';
import { NavLink } from 'react-router';

const menus = [
  {
    icon: Home,
    title: 'Trang chủ',
    path: dashboardPath.index,
  },
  {
    icon: User,
    title: 'Thông tin cá nhân',
    path: dashboardPath.personalInfo,
  },
  // {
  //     icon: Database,
  //     title: "Dữ liệu và quyền riêng tư",
  //     path: "/data-and-privacy",
  // },
  {
    icon: Lock,
    title: 'Bảo mật',
    path: dashboardPath.security,
  },
  // {
  //     icon: FiUsers,
  //     title: "Mọi người và chia sẻ",
  //     path: PATH_SHARING,
  // },
  {
    icon: CreditCard,
    title: 'Thanh toán và gói thuê bao',
    path: dashboardPath.payments,
  },
  {
    icon: Info,
    title: 'Giới thiệu',
    path: '/about',
  },
];

const Navigation = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({className, children, ...props}, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {/* Mobile navigation */}
      <div id="mobile-nav" className="mobile-nav">
        <div id="mobile-sidebar" className="mobile-sidebar overflow-y-auto">
          {/* Mobile sidebar content goes here - same as desktop sidebar */}
        </div>
      </div>
      <aside className="w-70 overflow-y-auto py-4 lg:block hidden">
        <nav>
          <ul className="cursor-pointer font-medium text-sm">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  state={{ from: `navigation-${menu.title}` }}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-3 flex items-center rounded-r-3xl',
                      isActive ? 'bg-primary/20 text-primary' : '',
                    )
                  }
                >
                  <menu.icon className="mr-4 h-4 w-5" />
                  <span>{menu.title}</span>
                </NavLink>
              </li>
            ))}
            {/* <li className="sidebar-item px-4 py-3 flex items-center">
                <NavLink to={PATH_HOME} className="flex items-center">
                  <FiHome className="mr-4 h-4 w-5" />
                  <span>Trang chủ</span>
                </NavLink>
              </li>
              <li className="sidebar-item active px-4 py-3 flex items-center">
                <NavLink to={PATH_PERSONALINFO} className="flex items-center">
                  <FiUser className="mr-4 h-4 w-5" />
                  <span>Thông tin cá nhân</span>
                </NavLink>
              </li>
              <li className="sidebar-item px-4 py-3 flex items-center">
                <FiDatabase className="mr-4 h-4 w-5" />
                <span>Dữ liệu và quyền riêng tư</span>
              </li>
              <li className="sidebar-item px-4 py-3 flex items-center">
                <FiLock className="mr-4 h-4 w-5" />
                <span>Bảo mật</span>
              </li>
              <li className="sidebar-item px-4 py-3 flex items-center">
                <FiUsers className="mr-4 h-4 w-5" />
                <span>Mọi người và chia sẻ</span>
              </li>
              <li className="sidebar-item px-4 py-3 flex items-center">
                <FiCreditCard className="mr-4 h-4 w-5" />
                <span>Thanh toán và gói thuê bao</span>
              </li>
              <li className="border-t border-gray-200" />
              <li className="sidebar-item px-4 py-3 flex items-center">
                <FiInfo className="mr-4 h-4 w-5" />
                <span>Giới thiệu</span>
              </li> */}
          </ul>
        </nav>
      </aside>
      {children}
    </div>
  );
});
Navigation.displayName = 'Navigation';

export default Navigation;
