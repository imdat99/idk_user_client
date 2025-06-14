import { useMemo } from 'react';
import { Outlet, useNavigation } from 'react-router';

const RootLayout = () => {
  const navigation = useNavigation();
  const loading = useMemo(
    () => navigation.state === 'loading',
    [navigation.state],
  );
  return (
    <>
      {loading && (
        <>
          <div className=":uno: fixed top-0 left-0 w-full bg-primary/40 z-50">
            <div className=":uno: w-full h-1 bg-primary/90 animate-loadingBar" />
          </div>
          <div className="fixed inset-0 bg-background/50 z-40" />
        </>
      )}
      <Outlet />
    </>
  );
};

export default RootLayout;
