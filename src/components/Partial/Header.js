import React from 'react';
import { Link } from 'react-router-dom';
import ThemeSwitch from '../ThemeSwitch';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 p-4 shadow-lg bg-[#29282D]">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-white">Back Office</h2>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard"
            className="text-white hover:bg-[#A238FF] px-4 py-2 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            to="/artists"
            className="text-white hover:bg-[#A238FF] px-4 py-2 rounded-md"
          >
            Artistes
          </Link>
          <Link
            to="/albums"
            className="text-white hover:bg-[#A238FF] px-4 py-2 rounded-md"
          >
            Albums
          </Link>
          <Link
            to="/media"
            className="text-white hover:bg-[#A238FF] px-4 py-2 rounded-md"
          >
            Médias
          </Link>
          <Link
            to="/settings"
            className="text-white hover:bg-[#A238FF] px-4 py-2 rounded-md"
          >
            Paramètres
          </Link>
        </nav>
        <div className="mt-auto">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
