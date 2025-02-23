/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import PopUp from '../../../common/Popup/Popup';
import { formatDuration } from '../../../../utils/formatters';

const AudioCard = ({ audio, onDelete }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    onDelete(audio._id);
    setShowDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#29282D] rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-white">{audio.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Album: {audio.album?.title || 'Non spécifié'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Artiste: {audio.artist?.name || 'Inconnu'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Durée: {formatDuration(audio.duration)}
          </p>
          <div className="flex justify-end space-x-2">
            <Link to={`/audio/update/${audio._id}`}>
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
        message={`Êtes-vous sûr de vouloir supprimer l'album "${audio.title}" ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default AudioCard;
