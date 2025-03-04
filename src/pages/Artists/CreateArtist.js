/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import { useToken } from '../../context/TokenContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const CreateArtist = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [formData, setFormData] = useState({
    name: '',
    namePhonetic: '',
    genres: [],
    bio: '',
    imageUrl: 'uploads/images/default_artist.webp',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => {
    const genres = e.target.value.split(',').map((genre) => genre.trim());
    setFormData((prevState) => ({
      ...prevState,
      genres,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const dataToSubmit = {
        ...formData,
        genres: formData.genres.filter((genre) => genre),
        imageUrl: formData.imageUrl || 'uploads/images/default_artist.webp',
      };

      const response = await fetch(`${API_URL}/artist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la création de l'artiste"
        );
      }

      navigate('/artists');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-[#29282D] rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Créer un nouvel artiste
          </h1>
          <Button variant="secondary" onClick={() => navigate('/artists')}>
            Retour
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="name"
              name="name"
              label="Nom de l'artiste"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <InputField
              id="namePhonetic"
              name="namePhonetic"
              label="Nom phonétique"
              value={formData.namePhonetic}
              onChange={handleChange}
            />
          </div>

          <InputField
            id="genres"
            name="genres"
            label="Genres (séparés par des virgules)"
            value={formData.genres.join(', ')}
            onChange={handleGenreChange}
            placeholder="Pop, Rock, Jazz..."
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 bg-[#1F1F23] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
              rows="4"
            />
          </div>

          <InputField
            id="imageUrl"
            name="imageUrl"
            label="URL de l'image (optionnel)"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Laissez vide pour utiliser l'image par défaut"
          />

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/artists')}
            >
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? 'Création...' : "Créer l'artiste"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateArtist;
