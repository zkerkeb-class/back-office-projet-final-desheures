/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { albumApi, audioApi, artistApi } from '../../services/api';

const CreateAlbum = () => {
  const [albumData, setAlbumData] = useState({
    title: '',
    artist: '', // ID de l'artiste
    releaseDate: '',
    genres: [],
    coverUrl: '',
    tracks: [], // Tableau d'ID de musiques
  });
  const [audios, setAudios] = useState([]); // Stocker les musiques récupérées
  const [artists, setArtists] = useState([]); // Stocker les artistes récupérés
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche pour les musiques
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Récupérer les musiques et artistes de la base de données
  useEffect(() => {
    const fetchAudiosAndArtists = async () => {
      try {
        const audioResponse = await audioApi.getAll();
        const artistResponse = await artistApi.getAll();
        setAudios(audioResponse.data); // Stocker les musiques
        setArtists(artistResponse.data); // Stocker les artistes
      } catch (err) {
        setError('Impossible de charger les musiques ou les artistes');
      }
    };
    fetchAudiosAndArtists();
  }, []);

  // Gérer le changement de champ dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la modification des genres
  const handleGenresChange = (e) => {
    const { value } = e.target;
    const genresArray = value.split(',').map((genre) => genre.trim());
    setAlbumData((prevData) => ({
      ...prevData,
      genres: genresArray,
    }));
  };

  // Gérer la sélection des musiques
  const handleTrackSelection = (e) => {
    const { value, checked } = e.target;
    setAlbumData((prevData) => ({
      ...prevData,
      tracks: checked
        ? [...prevData.tracks, value]
        : prevData.tracks.filter((track) => track !== value),
    }));
  };

  // Gérer la recherche parmi les musiques
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Soumettre le formulaire
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

  // Filtrer les musiques par le terme de recherche
  const filteredAudios = audios.filter((audio) =>
    audio.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Créer un album</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label htmlFor="title" className="block text-sm font-semibold">
              Titre de l'album
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={albumData.title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="artist" className="block text-sm font-semibold">
              Artiste
            </label>
            <select
              id="artist"
              name="artist"
              value={albumData.artist}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Sélectionnez un artiste</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-semibold"
            >
              Date de sortie
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={albumData.releaseDate}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="genres" className="block text-sm font-semibold">
              Genres (séparés par des virgules)
            </label>
            <input
              type="text"
              id="genres"
              name="genres"
              value={albumData.genres.join(', ')}
              onChange={handleGenresChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="coverUrl" className="block text-sm font-semibold">
              URL de la couverture
            </label>
            <input
              type="text"
              id="coverUrl"
              name="coverUrl"
              value={albumData.coverUrl}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label htmlFor="tracks" className="block text-sm font-semibold">
              Sélectionner les musiques
            </label>
            <input
              type="text"
              id="trackSearch"
              placeholder="Rechercher des musiques..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input"
            />
            <div className="mt-2 space-y-2">
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

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/albums')}
              className="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAlbum;
