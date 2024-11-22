import React from 'react';

const Button = ({ type = "button", children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-[#A238FF] text-white py-3 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {children}
    </button>
  );
};

export default Button;
