import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Artists from '../pages/Artists/Artists';
import CreateArtist from '../pages/Artists/CreateArtist';
import Albums from '../pages/Albums/Albums';
import Audio from '../pages/Audio/Audio';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/create" element={<CreateArtist />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/audio" element={<Audio />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl">Page non trouvée</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
