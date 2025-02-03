/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import Button from '../../components/common/Button/Button';
import { audioApi, artistApi } from '../../services/api';

const UpdateAudio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audio, setAudio] = useState(null);
  const [availableArtists, setAvailableArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    fileUrl: '',
  });

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const audioResponse = await audioApi.getById(id);
        setAudio(audioResponse.data);
        setFormData({
          title: audioResponse.data.title,
          artist: audioResponse.data.artist?._id || '',
          fileUrl: audioResponse.data.fileUrl,
        });

        const artistsResponse = await artistApi.getAll();
        setAvailableArtists(artistsResponse.data);
      } catch (err) {
        setError(
          "Impossible de charger les informations de l'audio ou des artistes disponibles."
        );
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/wav') {
      setSelectedFile(file);
    } else {
      setError('Veuillez sélectionner un fichier .wav');
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await audioApi.upload(formData);
      return response.data.fileUrl;
    } catch (err) {
      throw new Error("Erreur lors de l'upload du fichier");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      let fileUrl = formData.fileUrl;
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile);
      }

      const updatedAudio = {
        ...audio,
        title: formData.title,
        artist: formData.artist,
        fileUrl,
      };
      await audioApi.update(id, updatedAudio);
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
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">Modifier l'audio</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Titre de l'audio
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="artist"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Artiste
            </label>
            <select
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Sélectionner un artiste</option>
              {availableArtists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="audioFile"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Sélectionner un fichier audio (.wav)
            </label>
            <input
              type="file"
              id="audioFile"
              name="audioFile"
              accept=".wav"
              onChange={handleFileChange}
              className="input"
            />
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
