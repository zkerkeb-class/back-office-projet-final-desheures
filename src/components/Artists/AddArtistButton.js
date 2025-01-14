import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddArtistButton = () => {
  const navigate = useNavigate();

  const handleAddArtist = () => {
    navigate('/artists/create');
  };

  return (
    <button
      onClick={handleAddArtist}
      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Ajouter un artiste
    </button>
  );
};

export default AddArtistButton;
