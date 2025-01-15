/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import AlbumsList from '../../components/features/Albums/AlbumsList/AlbumsList';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { albumsApi } from '../../services/api';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await albumsApi.getAll();
        setAlbums(response.data);
      } catch (err) {
        setError('Impossible de charger les albums');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleDelete = async (id) => {
    try {
      await albumsApi.delete(id);
      setAlbums(albums.filter((album) => album._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des albums</h1>
        <div className="flex gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => navigate('/albums/create')}>
            Ajouter un album
          </Button>
        </div>
      </div>
      <AlbumsList albums={albums} search={search} onDelete={handleDelete} />
    </Layout>
  );
};

export default Albums;
