import React from 'react';

const AddArtistButton = ({ handleAddArtist }) => {
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
