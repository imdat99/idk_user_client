import Header from './Header';
import Navigation from './Navigation';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <Navigation />
      <main className="mx-main mx-auto flex flex-col px-6 py-4 max-w-4xl min-h-[calc(100vh-64px)]">
        <div className="flex-1">
          <Outlet />
        </div>
        <footer className="py-4 text-sm text-gray-600">
          <div className="flex flex-wrap gap-x-4">
            <a href="#" className="hover:text-gray-900">
              Quyền riêng tư
            </a>
            <a href="#" className="hover:text-gray-900">
              Điều khoản
            </a>
            <a href="#" className="hover:text-gray-900">
              Trợ giúp
            </a>
            <a href="#" className="hover:text-gray-900">
              Giới thiệu
            </a>
          </div>
        </footer>
      </main>
    </>
  );
};

export default DashboardLayout;
