import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';
import { formatDuration } from '../../../../utils/formatters';

const AudioCard = ({ audio, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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
          <Button variant="danger" onClick={() => onDelete(audio._id)}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
