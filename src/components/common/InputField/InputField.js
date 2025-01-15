/* eslint-disable comma-dangle */
import React from 'react';

const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder = '',
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full p-3 
          bg-[#29282D] 
          text-white 
          rounded-md 
          focus:ring-2 
          focus:ring-[#A238FF] 
          focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
