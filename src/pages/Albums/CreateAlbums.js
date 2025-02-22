/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { albumApi, audioApi, artistApi } from '../../services/api';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';

const CreateAlbum = () => {
  const [albumData, setAlbumData] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    genres: [],
    coverUrl: '',
    tracks: [],
  });
  const [audios, setAudios] = useState([]);
  const [artists, setArtists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudiosAndArtists = async () => {
      try {
        const audioResponse = await audioApi.getAll();
        const artistResponse = await artistApi.getAll();
        setAudios(audioResponse.data);
        setArtists(artistResponse.data);
      } catch (err) {
        setError('Impossible de charger les musiques ou les artistes');
      }
    };
    fetchAudiosAndArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenresChange = (e) => {
    const { value } = e.target;
    const genresArray = value.split(',').map((genre) => genre.trim());
    setAlbumData((prevData) => ({
      ...prevData,
      genres: genresArray,
    }));
  };

  const handleTrackSelection = (e) => {
    const { value, checked } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      tracks: checked
        ? [...prevData.tracks, value]
        : prevData.tracks.filter((track) => track !== value),
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await albumApi.create(albumData);
      navigate('/album');
    } catch (err) {
      setError("Erreur lors de la création de l'album");
    } finally {
      setLoading(false);
    }
  };

  const filteredAudios = audios.filter((audio) =>
    audio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-[#29282D] rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Créer un album</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="title"
            name="title"
            label="Titre de l'album"
            value={albumData.title}
            onChange={handleChange}
            required
          />

          <div>
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Artiste
            </label>
            <select
              id="artist"
              name="artist"
              value={albumData.artist}
              onChange={handleChange}
              required
              className="w-full p-3 bg-[#29282D] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none border-2 border-[#A238FF]"
            >
              <option value="">Sélectionnez un artiste</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            id="releaseDate"
            name="releaseDate"
            label="Date de sortie"
            value={albumData.releaseDate}
            onChange={handleChange}
            type="date"
          />

          <InputField
            id="genres"
            name="genres"
            label="Genres (séparés par des virgules)"
            value={albumData.genres.join(', ')}
            onChange={handleGenresChange}
          />

          <InputField
            id="coverUrl"
            name="coverUrl"
            label="URL de la couverture"
            value={albumData.coverUrl}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/albums')}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Chargement...' : 'Créer'}
            </Button>
          </div>
          <div>
            <label
              htmlFor="tracks"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Sélectionner les musiques
            </label>
            <input
              type="text"
              id="trackSearch"
              placeholder="Rechercher des musiques..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 bg-[#29282D] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none border-2 border-gray-600 mb-2"
            />
            <div className="mt-2 space-y-2 text-white">
              {filteredAudios.map((audio) => (
                <div key={audio._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`track-${audio._id}`}
                    value={audio._id}
                    checked={albumData.tracks.includes(audio._id)}
                    onChange={handleTrackSelection}
                    className="mr-2"
                  />
                  <label htmlFor={`track-${audio._id}`}>{audio.title}</label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAlbum;
