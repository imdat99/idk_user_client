import { useMemo } from 'react';
import { Outlet, useNavigation, useRevalidator } from 'react-router';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from './prime/passthrough';
const RootLayout = () => {
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const loading = useMemo(
    () => navigation.state === 'loading' || revalidator.state === 'loading',
    [navigation.state],
  );
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind, ripple: true }}>
      {loading && (
        <>
          <div className=":uno: fixed top-0 left-0 w-full bg-primary/40 z-50">
            <div className=":uno: w-full h-1 bg-primary/90 animate-loadingBar" />
          </div>
          <div className="fixed inset-0 bg-background/50 z-40" />
        </>
      )}
      <Outlet />
    </PrimeReactProvider>
  );
};

export default RootLayout;
