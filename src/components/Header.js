import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#29282D] border-b border-gray-600">
      <div className="flex items-center space-x-4">
        <img src="/desheures.webp" alt="DesHeures Logo" className="w-20 h-20" />
        <h1 className="text-2xl font-semibold text-white">DesHeures</h1>
      </div>
    </header>
  );
};

export default Header;
