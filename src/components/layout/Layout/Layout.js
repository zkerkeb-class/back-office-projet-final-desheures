import React from 'react';
import Header from '../Header/Header';
import { useTheme } from '../../../context/ThemeContext';

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <Header />
      <main
        className={`
          flex-grow p-6 
          ${theme === 'dark' ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'}
          transition-colors duration-200
        `}
        style={{ marginLeft: '16rem' }}
      >
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
