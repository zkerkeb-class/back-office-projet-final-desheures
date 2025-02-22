/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import Button from '../../components/common/Button/Button';
import { albumApi } from '../../services/api';
import { audioApi } from '../../services/api';
import { artistApi } from '../../services/api';

const UpdateAlbums = () => {
  const { id } = useParams(); // Récupère l'ID de l'album depuis les paramètres de l'URL
  const [album, setAlbum] = useState(null); // État pour stocker l'album à modifier
  const [availableTracks, setAvailableTracks] = useState([]); // État pour stocker les pistes disponibles
  const [availableArtists, setAvailableArtists] = useState([]); // État pour stocker les artistes disponibles
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(''); // État pour gérer les erreurs
  const [isUpdating, setIsUpdating] = useState(false); // État pour vérifier si une mise à jour est en cours
  const [formData, setFormData] = useState({
    // État pour les données du formulaire
    title: '',
    releaseDate: '',
    artist: '',
  });
  const [searchQuery, setSearchQuery] = useState(''); // État pour gérer la recherche de pistes
  const [filteredTracks, setFilteredTracks] = useState([]); // État pour les pistes filtrées en fonction de la recherche

  // Hook pour charger les données de l'album, les pistes et les artistes
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        // Récupère l'album à partir de l'API
        const albumResponse = await albumApi.getById(id);
        setAlbum(albumResponse.data);
        setFormData({
          title: albumResponse.data.title,
          releaseDate: new Date(albumResponse.data.releaseDate).getFullYear(),
          artist: albumResponse.data.artist?._id || '',
        });

        // Récupère les pistes disponibles
        const tracksResponse = await audioApi.getAll();
        setAvailableTracks(tracksResponse.data);

        // Récupère les artistes disponibles
        const artistsResponse = await artistApi.getAll();
        setAvailableArtists(artistsResponse.data);
      } catch (err) {
        setError(
          "Impossible de charger l'album, les musiques ou les artistes disponibles"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  // Hook pour filtrer les pistes en fonction de la recherche
  useEffect(() => {
    if (searchQuery) {
      const results = availableTracks.filter((track) =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTracks(results);
    } else {
      setFilteredTracks(availableTracks);
    }
  }, [searchQuery, availableTracks]);

  // Fonction pour gérer le changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fonction pour ajouter une piste à l'album
  const handleAddTrack = async (trackId) => {
    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        tracks: [...album.tracks, { _id: trackId }],
      };
      await albumApi.update(id, updatedAlbum);
      setAlbum(updatedAlbum);
    } catch (err) {
      setError("Erreur lors de l'ajout de la musique");
    } finally {
      setIsUpdating(false);
    }
  };

  // Fonction pour supprimer une piste de l'album
  const handleRemoveTrack = async (trackId) => {
    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        tracks: album.tracks.filter((track) => track._id !== trackId),
      };
      await albumApi.update(id, updatedAlbum);
      setAlbum(updatedAlbum);
    } catch (err) {
      setError('Erreur lors de la suppression de la musique');
    } finally {
      setIsUpdating(false);
    }
  };

  // Fonction pour gérer la soumission du formulaire (mise à jour de l'album)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedAlbum = {
        ...album,
        title: formData.title,
        releaseDate: new Date(formData.releaseDate).getFullYear(),
        artist: formData.artist,
      };
      await albumApi.update(id, updatedAlbum);
      setAlbum(updatedAlbum);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'album");
    } finally {
      setIsUpdating(false);
    }
  };

  // Gère l'état de chargement et d'erreur
  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!album) return <p>Aucun album trouvé.</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">Modifier l'album</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Titre de l'album
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Année de sortie
            </label>
            <input
              type="number"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Artiste
            </label>
            <div className="flex gap-2 items-center">
              <select
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
                required
              >
                <option value="">Sélectionner un artiste</option>
                {availableArtists.map((artist) => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </select>
              {formData.artist && (
                <Link
                  to={`/artist/update/${formData.artist}`}
                  className="text-[#A238FF] hover:text-[#8429DB] p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2 mt-4 text-white">
            Liste des musiques :
          </h2>
          {album.tracks && album.tracks.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {album.tracks.map((track, index) => (
                <li
                  key={track._id}
                  className="mb-1 flex justify-between items-center"
                >
                  <span>
                    {index + 1}. {track.title}
                  </span>
                  <div className="flex gap-2 items-center">
                    <Link
                      to={`/audio/update/${track._id}`}
                      className="text-[#A238FF] hover:text-[#8429DB] p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveTrack(track._id)}
                      disabled={isUpdating}
                    >
                      Supprimer
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune musique trouvée.</p>
          )}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdating}>
              {isUpdating ? 'Mise à jour...' : "Mettre à jour l'album"}
            </Button>
          </div>
        </form>

        <h3 className="text-xl font-semibold mb-2 mt-4 text-white">
          Ajouter une musique :
        </h3>
        <div className="mb-4">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Rechercher une musique
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
            placeholder="Rechercher par titre"
          />
        </div>

        {filteredTracks.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {filteredTracks.map((track) => (
              <li
                key={track._id}
                className="mb-1 flex justify-between items-center"
              >
                {track.title}
                <Button
                  variant="primary"
                  onClick={() => handleAddTrack(track._id)}
                  disabled={isUpdating}
                >
                  Ajouter
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            Aucune musique trouvée pour votre recherche.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default UpdateAlbums;
