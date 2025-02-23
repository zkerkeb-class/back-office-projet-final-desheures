/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import PopUp from '../../../common/Popup/Popup';

const ArtistCard = ({ artist, onDelete }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_IMAGE;

  const getImageUrl = (url) => {
    if (url?.startsWith('http')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    onDelete(artist._id);
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#29282D] rounded-lg shadow-lg overflow-hidden">
        <img
          src={
            getImageUrl(artist.imageUrl) || 'uploads/images/default_cover.jpg'
          }
          alt={artist.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-white">{artist.name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {artist.bio || 'Aucune biographie disponible'}
          </p>
          <div className="flex justify-end space-x-2">
            <Link to={`/artist/update/${artist._id}`}>
              <Button variant="secondary">Modifier</Button>
            </Link>
            <Button variant="danger" onClick={handleDeleteClick}>
              Supprimer
            </Button>
          </div>
        </div>
      </div>
      <PopUp
        isOpen={showDeletePopup}
        message={`Êtes-vous sûr de vouloir supprimer l'album "${artist.title}" ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default ArtistCard;
