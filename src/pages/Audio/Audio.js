/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import AudioList from '../../components/features/Audio/AudioList/AudioList';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { audioApi } from '../../services/api';
import { filterService } from '../../services/filter';
import SortBarAudio from '../../components/common/SortBar/SortBarAudio/SortBarAudio';
import InputField from '../../components/common/InputField/InputField';
import SelectField from '../../components/common/SelectField/SelectField'; // Nouveau composant SelectField

const Audio = () => {
  const [audios, setAudios] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    album: '',
    artist: '',
    genre: '',
    year: '',
    duration: '',
  });
  const [sortBy, setSortBy] = useState('alphabetical');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await audioApi.getAll();
        setAudios(response.data);
      } catch (err) {
        setError('Impossible de charger les audios');
      } finally {
        setLoading(false);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await filterService.getGenres();
        setGenres(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement des genres', err);
      }
    };

    fetchAudios();
    fetchGenres();
  }, []);

  const handleSort = () => {
    let sortedAudios = [...audios];

    if (sortBy === 'alphabetical') {
      sortedAudios = sortedAudios.sort((a, b) =>
        sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
    } else if (sortBy === 'duration') {
      sortedAudios = sortedAudios.sort((a, b) =>
        sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration
      );
    }

    setAudios(sortedAudios);
  };

  const handleDelete = async (id) => {
    try {
      await audioApi.delete(id);
      setAudios(audios.filter((audio) => audio._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const filteredAudios = audios.filter((audio) => {
    let isDurationValid = true;

    if (filter.duration) {
      const [minDuration, maxDuration] = filter.duration.split('-').map(Number);
      isDurationValid =
        audio.duration >= minDuration &&
        (maxDuration ? audio.duration <= maxDuration : true);
    }

    let isYearValid = true;
    if (filter.year) {
      const audioYear = new Date(audio.releaseDate).getFullYear().toString();
      isYearValid = audioYear === filter.year;
    }

    return (
      audio.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter.album ? audio.album?.title === filter.album : true) &&
      (filter.artist ? audio.artist?.name === filter.artist : true) &&
      (filter.genre ? audio.genre === filter.genre : true) &&
      isYearValid &&
      isDurationValid
    );
  });

  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des audios</h1>
        <Button onClick={() => navigate('/audio/create')}>
          Ajouter un audio
        </Button>
      </div>

      <div className="bg-white dark:bg-[#29282D] p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
          <SelectField
            id="album"
            label="Album"
            value={filter.album}
            onChange={(e) => setFilter({ ...filter, album: e.target.value })}
            options={[
              { value: '', label: 'Album' },
              ...[...new Set(audios.map((audio) => audio.album?.title))].map(
                (album) => ({ value: album, label: album })
              ),
            ]}
          />
          <SelectField
            id="artist"
            label="Artiste"
            value={filter.artist}
            onChange={(e) => setFilter({ ...filter, artist: e.target.value })}
            options={[
              { value: '', label: 'Artiste' },
              ...[...new Set(audios.map((audio) => audio.artist?.name))].map(
                (artist) => ({ value: artist, label: artist })
              ),
            ]}
          />
          <SelectField
            id="genre"
            label="Genre"
            value={filter.genre}
            onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
            options={[
              { value: '', label: 'Genre' },
              ...genres.map((genre) => ({ value: genre, label: genre })),
            ]}
          />
          <InputField
            type="number"
            className="input"
            placeholder="Année"
            value={filter.year}
            onChange={(e) => setFilter({ ...filter, year: e.target.value })}
          />
          <SelectField
            id="duration"
            label="Durée"
            value={filter.duration}
            onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
            options={[
              { value: '', label: 'Durée' },
              { value: '0-180', label: '0-3 min' },
              { value: '181-300', label: '3-5 min' },
              { value: '301+', label: '5+ min' },
            ]}
          />
        </div>
        <div className="mt-4 flex justify-between items-center gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setFilter({
                  album: '',
                  artist: '',
                  genre: '',
                  year: '',
                  duration: '',
                })
              }
              className="btn btn-secondary"
            >
              Réinitialiser
            </button>
            <button type="submit" className="btn btn-primary">
              Appliquer
            </button>
          </div>
          <div className="flex items-center gap-2">
            <SortBarAudio
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortByChange={setSortBy}
              onSortOrderChange={setSortOrder}
            />
            <Button onClick={handleSort}>Appliquer</Button>
          </div>
        </div>
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <AudioList audios={filteredAudios} onDelete={handleDelete} />
      )}
    </Layout>
  );
};

export default Audio;
