/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Partial/Header'; // Assure-toi que le chemin vers ton Header est correct

const CreateArtist = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [genres, setGenres] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newArtist = {
      name,
      bio,
      imageUrl,
      genres,
      socialLinks,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/artist`,
        newArtist
      );
      navigate('/artists');
    } catch (err) {
      setError("Impossible de créer l'artiste. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-6 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'}`}
    >
      <Header /> {/* Header ajouté ici */}
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-[#29282D]' : 'bg-white'}`}
      >
        <h1
          className={`text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'}`}
        >
          Ajouter un artiste
        </h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'} mb-2`}
            >
              Nom de l'artiste
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-[#29282D] text-white'
                  : 'bg-white text-black'
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="bio"
              className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'} mb-2`}
            >
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full p-3 rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-[#29282D] text-white'
                  : 'bg-white text-black'
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'} mb-2`}
            >
              URL de l'image
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full p-3 rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-[#29282D] text-white'
                  : 'bg-white text-black'
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genres"
              className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'} mb-2`}
            >
              Genres
            </label>
            <input
              id="genres"
              type="text"
              value={genres.join(', ')}
              onChange={(e) => setGenres(e.target.value.split(','))}
              placeholder="Séparez les genres par des virgules"
              className={`w-full p-3 rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-[#29282D] text-white'
                  : 'bg-white text-black'
              }`}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="socialLinks"
              className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'} mb-2`}
            >
              Liens sociaux
            </label>
            <input
              id="socialLinks"
              type="text"
              value={socialLinks.join(', ')}
              onChange={(e) => setSocialLinks(e.target.value.split(','))}
              placeholder="Séparez les liens par des virgules"
              className={`w-full p-3 rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none ${
                theme === 'dark'
                  ? 'bg-[#29282D] text-white'
                  : 'bg-white text-black'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-md ${theme === 'dark' ? 'bg-[#A238FF] text-white' : 'bg-[#4F46E5] text-white'} focus:outline-none`}
            disabled={loading}
          >
            {loading ? 'Chargement...' : "Créer l'artiste"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateArtist;
