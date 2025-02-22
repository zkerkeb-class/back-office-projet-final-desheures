/* eslint-disable comma-dangle */
import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Rechercher...' }) => {
  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          p-2
          pl-10
          border
          border-gray-300
          rounded-md
          dark:bg-[#29282D]
          dark:border-[#4B5563]
          dark:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
        "
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
