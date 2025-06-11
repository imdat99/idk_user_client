import { Grid, HelpCircle, Menu, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center px-4 py-2 sticky top-0 bg-white z-50">
      <div className="flex items-center">
        <button id="mobile-menu-btn" type='button' className="mr-4 hidden mobile-menu-btn">
          <Menu />
        </button>
        <img
          src="/assets/images/logo.svg"
          alt="Google Logo"
          className="h-6"
        />
        <span className="ml-2 text-lg text-gray-600 font-bold">Tài khoản</span>
      </div>
      <div className="ml-auto flex items-center">
        <button className="p-2" type='button'>
          <Search className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2" type='button'>
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2" type='button'>
          <Grid className="h-5 w-5 text-gray-500" />
        </button>
        <div className="ml-2 bg-purple-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
          D
        </div>
      </div>
    </header>
  );
};

export default Header;
