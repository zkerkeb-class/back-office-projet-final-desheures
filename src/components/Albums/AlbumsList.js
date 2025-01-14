import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumsList = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Aucun album à afficher.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {albums.map((album, index) => (
        <AlbumCard key={album._id || index} album={album} />
      ))}
    </div>
  );
};

export default AlbumsList;
