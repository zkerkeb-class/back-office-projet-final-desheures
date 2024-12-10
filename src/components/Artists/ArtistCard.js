import React from 'react';

const ArtistCard = ({ artist }) => {
  return (
    <div className="bg-white dark:bg-[#29282D] shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={artist.imageUrl}
        alt={artist.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-lg font-semibold">{artist.name}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{artist.bio}</p>
      <div className="mt-2 flex flex-wrap justify-center">
        {artist.genres.map((genre, index) => (
          <span
            key={index}
            className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full m-1"
          >
            {genre}
          </span>
        ))}
      </div>
      <div className="mt-4 flex space-x-3">
        {artist.socialLinks.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArtistCard;
