/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import AudioList from '../../components/features/Audio/AudioList/AudioList';
import FilterPanel from '../../components/common/Filters/FilterPanel';
import { audioApi } from '../../services/api';
import { filterService } from '../../services/filter';

const Audio = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    artists: [],
    albums: [],
    genres: [],
  });

  const sortOptions = [
    { value: 'duration', label: 'Durée' },
    { value: 'releaseDate', label: 'Date de sortie' },
    { value: 'title', label: 'Titre' },
    { value: 'popularity', label: 'Popularité' },
    { value: 'plays', label: "Nombre d'écoutes" },
  ];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [audiosData, artistsData, albumsData, genresData] =
        await Promise.all([
          audioApi.getAll(),
          artistsApi.getAll(),
          albumsApi.getAll(),
          api.get('/genres'),
        ]);

      setAudios(audiosData.data);
      setFilters({
        artists: artistsData.data,
        albums: albumsData.data,
        genres: genresData.data,
      });
    } catch (err) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filterValues) => {
    try {
      setLoading(true);
      let filteredData = audios;

      if (filterValues.artist) {
        const response = await filterService.getTracksByArtist(
          filterValues.artist
        );
        filteredData = response.data;
      }
      if (filterValues.album) {
        const response = await filterService.getTracksByAlbum(
          filterValues.album
        );
        filteredData = response.data;
      }
      if (filterValues.sortBy) {
        filteredData.sort((a, b) => {
          const compareValue =
            a[filterValues.sortBy] > b[filterValues.sortBy] ? 1 : -1;
          return filterValues.sortOrder === 'asc'
            ? compareValue
            : -compareValue;
        });
      }

      setAudios(filteredData);
    } catch (err) {
      setError('Erreur lors du filtrage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <FilterPanel
        onFilter={handleFilter}
        filters={filters}
        sortOptions={sortOptions}
      />
      <AudioList audios={audios} loading={loading} error={error} />
    </Layout>
  );
};

export default Audio;
