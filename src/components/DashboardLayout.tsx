import { Outlet } from 'react-router';
import Header from './Header';
import Navigation from './Navigation';

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div>
                <Navigation className='h-0 fixed w-full z-50' />
                <main className="lg:ml-70 flex flex-col">
                    <div className="block w-full mx-auto lg:(px-6 py-4 max-w-6xl) px-4 py-2 max-w-4xl">
                        <div className='lg:max-w-4xl'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default DashboardLayout;
