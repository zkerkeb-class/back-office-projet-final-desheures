import React from 'react';
import AudioCard from '../AudioCard/AudioCard';

const AudioList = ({ audios, search, onDelete }) => {
  const filteredAudios = audios.filter(
    (audio) =>
      audio.title.toLowerCase().includes(search.toLowerCase()) ||
      audio.artist.name.toLowerCase().includes(search.toLowerCase()) ||
      audio.album.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!filteredAudios.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        Aucun audio ne correspond à votre recherche.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAudios.map((audio) => (
        <AudioCard key={audio._id} audio={audio} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default AudioList;
