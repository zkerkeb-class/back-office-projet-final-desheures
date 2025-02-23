/* eslint-disable comma-dangle */
import React from 'react';

const SortBarAudio = ({
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
        <option value="alphabetical">Trier par nom</option>
        <option value="duration">Trier par durée</option>
      </select>

      {sortBy === 'duration' && (
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

export default SortBarAudio;
