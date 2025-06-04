import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* You can add a header or navigation here later */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet /> {/* This is where the nested routes will render */}
      </main>
      {/* You can add a footer here later */}
    </div>
  );
};

export default Layout;