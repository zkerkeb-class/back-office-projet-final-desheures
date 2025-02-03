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
  const [selectedFile, setSelectedFile] = useState(null);
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/wav') {
      setSelectedFile(file);
    } else {
      setError('Veuillez sélectionner un fichier .wav');
    }
  };

  const uploadFile = async (file) => {
    // Ici, tu dois implémenter l'envoi du fichier vers ton serveur ou un stockage externe
    // Pour cet exemple, on suppose que l'API retourne une URL après l'upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await audioApi.upload(formData); // Modifier selon ton API
      return response.data.audioUrl; // Supposons que l'API retourne { audioUrl: "https://..." }
    } catch (err) {
      throw new Error("Erreur lors de l'upload du fichier");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let audioUrl = audioData.audioUrl;

      if (selectedFile) {
        audioUrl = await uploadFile(selectedFile);
      }

      await audioApi.create({ ...audioData, audioUrl });
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
              htmlFor="audioFile"
              className="block text-sm font-semibold text-gray-400 mb-2"
            >
              Sélectionner un fichier audio (.wav)
            </label>
            <input
              type="file"
              id="audioFile"
              name="audioFile"
              accept=".wav"
              onChange={handleFileChange}
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
