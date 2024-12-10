import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme(); // Vérifie que useTheme() retourne bien { theme, toggleTheme }

  return (
    <div className="flex items-center justify-center my-4">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:bg-gray-700 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {theme === 'dark' ? 'Sombre' : 'Clair'}
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
