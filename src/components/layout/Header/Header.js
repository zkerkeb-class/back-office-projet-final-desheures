/* eslint-disable indent */
/* eslint-disable comma-dangle */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import ThemeSwitch from '../../common/ThemeSwitch/ThemeSwitch';

const Header = () => {
  const location = useLocation();
  const { logout } = useAuthContext();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Artistes', path: '/artists' },
    { name: 'Albums', path: '/albums' },
    { name: 'Audio', path: '/audio' },
    { name: 'Paramètres', path: '/settings' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#29282D] shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Back Office</h2>
        </div>

        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-2 rounded-md
                    transition-colors duration-200
                    ${
                      isActivePath(item.path)
                        ? 'bg-[#A238FF] text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4">
            <ThemeSwitch />
            <button
              onClick={logout}
              className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
