/* eslint-disable comma-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout/Layout';
import { useForm } from '../../hooks/useForm';
import { artistsApi } from '../../services/api';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';

const CreateArtist = () => {
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm({
    name: '',
    bio: '',
    imageUrl: '',
  });

  const onSubmit = async () => {
    await artistsApi.create(values);
    navigate('/artists');
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Créer un artiste</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}
        >
          <InputField
            id="name"
            label="Nom"
            value={values.name}
            onChange={handleChange}
            required
          />

          <InputField
            id="bio"
            label="Biographie"
            value={values.bio}
            onChange={handleChange}
            as="textarea"
            rows={4}
          />

          <InputField
            id="imageUrl"
            label="URL de l'image"
            value={values.imageUrl}
            onChange={handleChange}
          />

          <div className="flex gap-4 mt-6">
            <Button type="submit">Créer</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/artists')}
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateArtist;
