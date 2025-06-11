import React from 'react';
import { Outlet } from 'react-router';

const PolicyLayout = () => {
  return (
    <div className="bg-background flex items-center min-h-svh flex-col antialiased">
      <Outlet />
    </div>
  );
};

export default PolicyLayout;
