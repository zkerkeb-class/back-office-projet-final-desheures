/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import Button from '../../components/common/Button/Button';
import { audioApi } from '../../services/api';
import InputField from '../../components/common/InputField/InputField';

const UpdateAudio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    genres: [],
  });

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const audioResponse = await audioApi.getById(id);
        setAudio(audioResponse.data);
        setFormData({
          title: audioResponse.data.title,
          artist: audioResponse.data.artist?.name || '',
          genres: audioResponse.data.genres,
        });
      } catch (err) {
        setError("Impossible de charger les informations de l'audio.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudio();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Le fichier doit être un fichier audio');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formDataToSubmit = new FormData();
      if (selectedFile) {
        formDataToSubmit.append('file', selectedFile);
      }

      formDataToSubmit.append('title', formData.title);
      formDataToSubmit.append('artist', formData.artist);
      formDataToSubmit.append('genres', formData.genres);
      await audioApi.update(id, formDataToSubmit);
      navigate(`/audio/${id}`);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'audio.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!audio) return <p>Aucun audio trouvé.</p>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#29282D] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">Modifier l'audio</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Titre de l'audio
            </label>
            <InputField
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Artiste
            </label>
            <InputField
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genres"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Genre
            </label>
            <InputField
              type="text"
              id="genres"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className="input"
            />
          </div>

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
              {audio.audioUrl && !selectedFile && (
                <div className="text-white mt-4">
                  <p>URL de l'audio: </p>
                  <p className="text-[#A238FF]">{audio.audioUrl}</p>
                </div>
              )}
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdating}>
              {isUpdating ? 'Mise à jour...' : "Mettre à jour l'audio"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateAudio;
