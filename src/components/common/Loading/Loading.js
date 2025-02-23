/* eslint-disable comma-dangle */
import React from 'react';

const Loading = ({ size = 'medium' }) => {
  const sizes = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`
          animate-spin 
          rounded-full 
          ${sizes[size]} 
          border-t-2 
          border-b-2 
          border-purple-500
        `}
      />
    </div>
  );
};

export default Loading;
