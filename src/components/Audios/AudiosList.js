import React from 'react';
import AudioCard from './AudioCard';

const AudiosList = ({ audios }) => {
  if (!audios || audios.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Aucun audios à afficher.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {audios.map((audio, index) => (
        <AudioCard key={audio._id || index} audio={audio} />
      ))}
    </div>
  );
};

export default AudiosList;
