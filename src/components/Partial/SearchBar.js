import React from 'react';

const SearchBar = ({ search, handleSearchChange }) => {
  return (
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Rechercher un artiste"
      className="p-2 border border-gray-300 rounded-md dark:bg-[#29282D] dark:border-[#4B5563] dark:text-white"
      style={{ width: '250px' }}
    />
  );
};

export default SearchBar;
