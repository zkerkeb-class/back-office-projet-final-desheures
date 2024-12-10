import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Partial/Header';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Header />
      <div className="flex-grow p-8 bg-[#0F0D13]">
        <div className="min-h-screen bg-[#0F0D13] flex flex-col">
          {isAuthenticated ? (
            <div className="flex-grow flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                Bienvenue dans le Backoffice
              </h1>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">Chargement...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
