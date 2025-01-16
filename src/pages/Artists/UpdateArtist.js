/* eslint-disable react/no-unescaped-entities */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import { useToken } from '../../context/TokenContext';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const UpdateArtist = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    namePhonetic: '',
    genres: [],
    bio: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`${API_URL}/artist/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Erreur lors de la récupération de l'artiste"
          );
        }

        const artist = await response.json();
        setFormData({
          name: artist.name,
          namePhonetic: artist.namePhonetic,
          genres: artist.genres,
          bio: artist.bio,
          imageUrl: artist.imageUrl,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArtist();
  }, [id, token]);

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
      const response = await fetch(`${API_URL}/artist/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          genres: formData.genres.filter((genre) => genre),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Erreur lors de la mise à jour de l'artiste"
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
            Mettre à jour l'artiste
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
            label="URL de l'image"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
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
              {isLoading ? 'Mise à jour...' : "Mettre à jour l'artiste"}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateArtist;
