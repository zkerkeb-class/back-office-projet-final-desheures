import React from 'react';
import ArtistCard from '../ArtistCard/ArtistCard';

const ArtistsList = ({ artists, search, onDelete }) => {
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredArtists.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Aucun artiste ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredArtists.map((artist) => (
        <ArtistCard key={artist._id} artist={artist} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ArtistsList;
