/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import AlbumsList from '../../components/features/Albums/AlbumsList/AlbumsList';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { albumApi } from '../../services/api';
import { sortService } from '../../services/sortService';
import SortBarAlbum from '../../components/common/SortBar/SortBarAlbum/SortBarAlbum';

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await albumApi.getAll();
        setAlbums(response.data);
      } catch (err) {
        setError('Impossible de charger les albums');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleSort = async () => {
    try {
      let response;
      if (sortBy === 'date') {
        response = await sortService.getAlbumsByDate(sortOrder);
      } else if (sortBy === 'popularity') {
        response = await sortService.getAlbumsByPopularity();
      } else if (sortBy === 'tracks') {
        response = await sortService.getAlbumsByTracks(sortOrder);
      } else if (sortBy === 'released') {
        response = await sortService.getAlbumsByReleased();
      }

      setAlbums(response.data);
    } catch (err) {
      setError('Erreur lors du tri des albums');
    }
  };

  const handleDelete = async (id) => {
    try {
      await albumApi.delete(id);
      setAlbums(albums.filter((album) => album._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des albums</h1>
        <div className="flex gap-4 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SortBarAlbum
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />
          <Button onClick={handleSort}>Appliquer</Button>
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
