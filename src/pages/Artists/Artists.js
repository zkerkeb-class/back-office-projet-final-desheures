/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import ArtistsList from '../../components/features/Artists/ArtistsList/ArtistsList';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { artistApi } from '../../services/api';
import { logError } from '../../utils/logger';
import { sortService } from '../../services/sortService';
import SortBarArtist from '../../components/common/SortBar/SortBarArtist/SortBarArtist';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('alphabetical');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await artistApi.getAll();
        setArtists(response.data);
      } catch (err) {
        setError('Impossible de charger les artistes');
        logError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleSort = async () => {
    try {
      let response;
      if (sortBy === 'alphabetical') {
        response = await sortService.getArtistsAlphabetical(sortOrder);
      } else if (sortBy === 'popularity') {
        response = await sortService.getArtistsByPopularity();
      }

      setArtists(response.data);
    } catch (err) {
      setError('Erreur lors du tri des artistes');
      logError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await artistApi.delete(id);
      setArtists(artists.filter((artist) => artist._id !== id));
    } catch (err) {
      logError(err);
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des artistes</h1>
        <div className="flex gap-4 items-center">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SortBarArtist
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />
          <Button onClick={handleSort}>Appliquer</Button>
          <Button onClick={() => navigate('/artist/create')}>
            Ajouter un artiste
          </Button>
        </div>
      </div>
      <ArtistsList artists={artists} search={search} onDelete={handleDelete} />
    </Layout>
  );
};

export default Artists;
