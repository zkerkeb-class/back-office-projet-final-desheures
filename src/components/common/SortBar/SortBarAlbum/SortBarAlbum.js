/* eslint-disable comma-dangle */
import React from 'react';

const SortBarAlbum = ({
  sortBy,
  sortOrder,
  onSortByChange,
  onSortOrderChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm dark:bg-[#29282D] dark:border-[#4B5563] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="date">Trier par date</option>
        <option value="popularity">Trier par popularité</option>
        <option value="tracks">Trier par nombre de morceaux</option>
        <option value="released">Trier par année de sortie</option>
      </select>

      {(sortBy === 'date' || sortBy === 'tracks') && (
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-sm dark:bg-[#29282D] dark:border-[#4B5563] dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="asc">Ordre croissant</option>
          <option value="desc">Ordre décroissant</option>
        </select>
      )}
    </div>
  );
};

export default SortBarAlbum;
