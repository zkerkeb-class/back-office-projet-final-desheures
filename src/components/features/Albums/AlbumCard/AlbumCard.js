/* eslint-disable comma-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/Button/Button';

const AlbumCard = ({ album, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const API_URL = process.env.REACT_APP_BACKEND_IMAGE;

  const getImageUrl = (url) => {
    if (url?.startsWith('http')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img
        src={getImageUrl(album.coverUrl)}
        alt={album.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-white">
          <Link to={`/albums/update/${album._id}`} className="hover:underline">
            {album.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Artiste: {album.artist?.name || 'Inconnu'}
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Année: {formatDate(album.releaseDate)}
        </p>
        <div className="flex justify-end space-x-2">
          <Link to={`/albums/update/${album._id}`}>
            <Button variant="secondary">Modifier</Button>
          </Link>
          <Button variant="danger" onClick={() => onDelete(album._id)}>
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
