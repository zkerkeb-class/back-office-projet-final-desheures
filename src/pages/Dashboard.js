/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '../components/layout/Layout/Layout';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/common/Loading/Loading';

const Dashboard = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bienvenue dans le Backoffice</h1>
      </div>
    </Layout>
  );
};

export default Dashboard;
