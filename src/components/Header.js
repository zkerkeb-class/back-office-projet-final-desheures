import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between bg-[#29282D] border-b border-gray-600 p-5">
      <h1 className="text-2xl font-semibold text-white">DesHeures</h1>
      <button
        onClick={toggleTheme}
        className="text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600"
      >
        {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
      </button>
    </header>
  );
};

export default Header;
