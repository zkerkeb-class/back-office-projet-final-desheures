import React from 'react';

const AudioCard = ({ audio }) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-[#29282D] shadow-md rounded-lg p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold">{audio.title}</h2>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Artiste: {audio.artist.name}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Album: {audio.album.title}
      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Durée: {formatDuration(audio.duration)}
      </p>

      <div className="mt-2 flex flex-wrap justify-center">
        {audio.genres.map((genre, index) => (
          <span
            key={index}
            className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 px-2 py-1 rounded-full m-1"
          >
            {genre}
          </span>
        ))}
      </div>

      <div className="mt-4 flex space-x-3">
        {audio.artist.socialLinks &&
          audio.artist.socialLinks.map((link) => (
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

export default AudioCard;
