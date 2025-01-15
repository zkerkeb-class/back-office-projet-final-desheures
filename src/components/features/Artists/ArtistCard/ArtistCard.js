import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';

const ArtistCard = ({ artist, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img
        src={artist.imageUrl || '/default-artist.png'}
        alt={artist.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">{artist.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {artist.bio || 'Aucune biographie disponible'}
        </p>
        <div className="flex justify-end space-x-2">
          <Link to={`/artists/edit/${artist._id}`}>
            <Button variant="secondary">Modifier</Button>
          </Link>
          <Button variant="danger" onClick={() => onDelete(artist._id)}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
