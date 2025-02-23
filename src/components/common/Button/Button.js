/* eslint-disable comma-dangle */
import React from 'react';

const Button = ({
  type = 'button',
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}) => {
  const baseStyles =
    'py-3 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 transition-colors';

  const variants = {
    primary:
      'bg-[#A238FF] text-white hover:bg-purple-700 focus:ring-purple-500',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
