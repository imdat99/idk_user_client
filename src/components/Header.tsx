import { cn } from 'lib/utils';
import { Grid, Menu } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

const Header = forwardRef<HTMLHeadElement, React.HTMLAttributes<HTMLHeadElement>>(({ className, children, ...props }, ref) => {
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
        threshold: [0.01]
      }
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
      <header className={cn("flex items-center px-4 py-2 sticky top-0 bg-white/90 z-50 backdrop-blur-sm transition-shadow duration-300 will-change-transform", className, hasShadow && "shadow-md")} {...props} ref={ref}>
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
          {/* <button className="p-2" type='button'>
            <Search className="h-5 w-5 text-gray-500" />
          </button> */}
          {/* <button className="p-2" type='button'>
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </button> */}
          <button className="p-2" type='button'>
            <Grid className="h-5 w-5 text-gray-500" />
          </button>
          <div className="ml-2 bg-purple-700 text-white rounded-full h-8 w-8 flex items-center justify-center">
            D
          </div>
        </div>
      </header>
    </>
  );
});
Header.displayName = 'Xemdi-Header';
export default Header;
