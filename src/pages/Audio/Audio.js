/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout/Layout';
import AudioList from '../../components/features/Audio/AudioList/AudioList';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { audioApi } from '../../services/api';

const Audio = () => {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await audioApi.getAll();
        setAudios(response.data);
      } catch (err) {
        setError('Impossible de charger les audios');
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await audioApi.delete(id);
      setAudios(audios.filter((audio) => audio._id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liste des audios</h1>
        <div className="flex gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => navigate('/audio/create')}>
            Ajouter un audio
          </Button>
        </div>
      </div>
      <AudioList audios={audios} search={search} onDelete={handleDelete} />
    </Layout>
  );
};

export default Audio;
