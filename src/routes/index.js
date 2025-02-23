import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Artists from '../pages/Artists/Artists';
import CreateArtist from '../pages/Artists/CreateArtist';
import UpdateArtist from '../pages/Artists/UpdateArtist';
import Albums from '../pages/Albums/Albums';
import CreateAlbums from '../pages/Albums/CreateAlbums';
import UpdateAlbums from '../pages/Albums/UpdateAlbums';
import Audio from '../pages/Audio/Audio';
import CreateAudio from '../pages/Audio/CreateAudio';
import UpdateAudio from '../pages/Audio/UpdateAudio';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/create" element={<CreateArtist />} />
        <Route path="/artist/update/:id" element={<UpdateArtist />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/create" element={<CreateAlbums />} />
        <Route path="/albums/update/:id" element={<UpdateAlbums />} />
        <Route path="/audio" element={<Audio />} />
        <Route path="/audio/create" element={<CreateAudio />} />
        <Route path="/audio/update/:id" element={<UpdateAudio />} />
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
