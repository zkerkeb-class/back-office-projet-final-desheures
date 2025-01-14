import React from 'react';

const AlbumCard = ({ album }) => {
  const calculateTotalDuration = () => {
    const totalSeconds = album.tracks.reduce(
      (sum, track) => sum + track.duration,
      0
    );
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-[#29282D] shadow-md rounded-lg p-4 flex flex-col items-center">
      <img
        src={album.coverUrl}
        alt={album.title}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-lg font-semibold">{album.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {album.artist.bio}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Durée totale : {calculateTotalDuration()}
      </p>

      <div className="mt-2 flex flex-wrap justify-center">
        {album.genres.map((genre, index) => (
          <span
            key={index}
            className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full m-1"
          >
            {genre}
          </span>
        ))}
      </div>

      <div className="mt-4 flex space-x-3">
        {album.artist.socialLinks.map((link) => (
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

export default AlbumCard;
