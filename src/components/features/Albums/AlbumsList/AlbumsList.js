import React from 'react';
import AlbumCard from '../AlbumCard/AlbumCard';

const AlbumsList = ({ albums, search, onDelete }) => {
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(search.toLowerCase()) ||
      album.artist.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredAlbums.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Aucun album ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAlbums.map((album) => (
        <AlbumCard key={album._id} album={album} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AlbumsList;
