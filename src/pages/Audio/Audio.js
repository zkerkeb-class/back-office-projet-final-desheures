import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Partial/Header';
import SearchBar from '../../components/Partial/SearchBar';
import AudiosList from '../../components/Audios/AudiosList';

const Audio = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/audio`
        );
        setAudios(response.data);
        setLoading(false);
      } catch (err) {
        setError('Impossible de charger les audios. Veuillez réessayer.');
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="flex">
      <Header />
      <div
        className={`flex-grow p-6 ${theme === 'dark' ? 'bg-[#111827]' : 'bg-white'} text-gray-800 dark:text-gray-200`}
        style={{ marginLeft: '16rem' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#29282D]'}`}
          >
            Liste des audios
          </h1>
          <SearchBar search={search} handleSearchChange={handleSearchChange} />
        </div>

        <AudiosList audios={audios} search={search} />
      </div>
    </div>
  );
};

export default Audio;
