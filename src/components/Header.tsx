import { cn } from 'lib/utils';
import { ArrowLeft, Grid, Menu } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

const Header = forwardRef<
  HTMLHeadElement,
  React.HTMLAttributes<HTMLHeadElement>
>(({ className, children, ...props }, ref) => {
  const location = useLocation();
  console.log('Header rendered at:', location.pathname, location.state);
  const [hasShadow, setHasShadow] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => setHasShadow(!entry.isIntersecting),
      {
        root: null, // viewport
        rootMargin: '0px 0px 0px 0px',
        threshold: [0.01],
      },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
        observerRef.current.disconnect();
      }
    };
  }, []);
  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 h-0 w-full" />
      <header
        className={cn(
          ':uno: flex relative flex-col items-center sticky px-4 top-0 bg-white/90 z-50 backdrop-blur-sm transition-shadow duration-300 will-change-transform',
          className,
          hasShadow && 'shadow-md',
        )}
        {...props}
        ref={ref}
      >
        <div className="flex items-center w-full py-2">
          <div className="flex items-center">
            <button
              id="mobile-menu-btn"
              type="button"
              className="mr-4 hidden mobile-menu-btn"
            >
              <Menu />
            </button>
            <img
              src="/assets/images/logo.svg"
              alt="Xemdi Logo"
              className="h-6"
            />
            <span className="ml-2 text-lg text-xl text-center h-6">
              Tài khoản
            </span>
          </div>
          <div className="ml-auto flex items-center">
            {/* <button className="p-2" type='button'>
            <Search className="h-5 w-5 text-gray-500" />
          </button> */}
            {/* <button className="p-2" type='button'>
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </button> */}
            <button className="p-2" type="button">
              <Grid className="h-5 w-5 text-gray-500" />
            </button>
            <div className="ml-2 bg-purple-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
              D
            </div>
          </div>
        </div>
        <div className="mx-auto mb-3 max-w-full w-4xl lg:px-6" hidden>
          <Link
            to=".."
            className="text-google-blue hover:text-blue-700 font-medium inline-flex items-center"
          >
            <ArrowLeft className="text-gray-500" />
            <span
              className={cn(
                'text-2xl transition-all duration-300 ml-3',
                hasShadow && 'text-xl',
              )}
            >
              Quay lại
            </span>
          </Link>
          <div className="border-b border-gray-300 w-full absolute left-0 bottom-0" />
        </div>
      </header>
    </>
  );
});
Header.displayName = 'Xemdi-Header';
export default Header;
