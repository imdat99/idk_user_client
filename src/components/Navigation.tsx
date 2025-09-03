import { dashboardPath } from 'lib/constants';
import { cn } from 'lib/utils';
import { Blocks, CreditCard, EllipsisVertical, Home, Lock, User } from 'lucide-react';
import { forwardRef } from 'react';
import { NavLink } from 'react-router';
import LogoIcon from './Icon/Logo';
import { Button } from './Button';
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
  {
      icon: LogoIcon,
      title: "Mọi người và chia sẻ",
      path: "abc",
  },
  {
    icon: CreditCard,
    title: 'Thanh toán và gói thuê bao',
    path: dashboardPath.payments,
  },
  {
    icon: Blocks,
    title: 'Ứng dụng và trang web',
    path: dashboardPath.applications,
  }
];

const Navigation = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={className} {...props}>
      {/* Mobile navigation */}
      <div id="mobile-nav" className=" lg:hidden">
        <div id="mobile-sidebar" className="mobile-sidebar overflow-y-auto">
          {/* Mobile sidebar content goes here - same as desktop sidebar */}
        </div>
      </div>
      <aside className="max-w-70 h-svh overflow-y-auto lg:block hidden">
        <nav className='px-3 flex flex-col h-full'>
          <div className='py-4 flex items-center justify-between border-b border-gray-200 mb-4'>
            <div className='flex items-center'>
              <div className="ml-2 bg-purple-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
                D
              </div>
              <div>
                <div className="ml-3 text-sm font-medium">Demo User</div>
                <div className="ml-3 text-xs text-gray-500">
                  imdat2999@gmail.com
                </div>
              </div>
            </div>
            <div>
              <Button size='icon' variant='ghost'>
                <EllipsisVertical className='text-gray-500'/>
              </Button>
            </div>
          </div>
          <ul className="flex-1 text-sm">
            {menus.map((menu) => (
              <li key={menu.path}>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 mb-2 flex items-center rounded-md hover:bg-gray-100 relative',
                      isActive ? `:uno: fw-bold after:(bg-gray-100 content-[''] w-full h-full absolute left-0 -z-1 rounded-md) before:(absolute content-[''] left-1 h-[60%] rounded-lg border-primary w-1 border-l-5 animate-bounce-in)` : '',
                    )
                  }
                >
                  <menu.icon className="mr-4 h-4 w-5" />
                  <span className="">{menu.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div className='text-gray-500 pb-1'>
            <div className="flex group select-none">
              <LogoIcon className="h-4 my-auto group-hover:animate-spin"/>
              <div className="my-auto space-x-1">
                <b className="text-sm">Tài khoản</b>
                <i className='text-[11px]'>v1.0.0 &copy; 2024</i>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      {children}
    </div>
  );
});
Navigation.displayName = 'Navigation';

export default Navigation;
