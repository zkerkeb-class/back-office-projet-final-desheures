/* eslint-disable no-console */
/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { audioApi } from '../../services/api';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';

const CreateAudio = () => {
  const navigate = useNavigate();
  const [audioData, setAudioData] = useState({
    artist: '',
    album: '',
    genre: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAudioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError('');

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
    } else {
      setError('Le fichier doit être un fichier audio');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Le fichier doit être un fichier audio');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier audio');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('artist', audioData.artist);
      formData.append('album', audioData.album);
      formData.append('genre', audioData.genre);

      if (typeof audioApi.create !== 'function') {
        throw new Error("La fonction create n'existe pas dans audioApi");
      }

      const response = await audioApi.create(formData);

      if (response.data) {
        navigate('/audio');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la création de l'audio"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-[#29282D] rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Ajouter un nouvel audio
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center ${
              dragActive
                ? 'border-[#A238FF] bg-[#A238FF]/10'
                : 'border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              id="audio-file"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="audio-file"
              className="cursor-pointer block text-gray-400"
            >
              {selectedFile ? (
                <div className="text-white">
                  <p className="text-[#A238FF]">
                    Fichier sélectionné: {selectedFile.name}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-lg mb-2">
                    Glissez et déposez votre fichier audio ici
                  </p>
                  <p className="text-sm text-gray-500">
                    ou cliquez pour sélectionner un fichier
                  </p>
                </div>
              )}
            </label>
          </div>

          <InputField
            id="artist"
            name="artist"
            label="Artiste"
            value={audioData.artist}
            onChange={handleChange}
            required
          />
          <InputField
            id="album"
            name="album"
            label="Album"
            value={audioData.album}
            onChange={handleChange}
          />
          <InputField
            id="genre"
            name="genre"
            label="Genre"
            value={audioData.genre}
            onChange={handleChange}
          />

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/audio')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !selectedFile}
            >
              {loading ? 'Création...' : "Créer l'audio"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAudio;
