/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { audioApi } from '../../services/api';

const CreateAudio = () => {
  const [audioData, setAudioData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    duration: '',
    releaseDate: '',
    audioUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAudioData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await audioApi.create(audioData);
      navigate('/audio');
    } catch (err) {
      setError("Erreur lors de l'ajout de l'audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ajouter un audio</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={audioData.title}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="artist"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Artiste
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={audioData.artist}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="album"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Album
            </label>
            <input
              type="text"
              id="album"
              name="album"
              value={audioData.album}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={audioData.genre}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Durée (en secondes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={audioData.duration}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Date de sortie
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={audioData.releaseDate}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label
              htmlFor="audioUrl"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              URL de l'audio
            </label>
            <input
              type="text"
              id="audioUrl"
              name="audioUrl"
              value={audioData.audioUrl}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/audio')}
              className="btn btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAudio;
