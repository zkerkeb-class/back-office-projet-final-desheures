/* eslint-disable comma-dangle */
import React from 'react';

const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  error,
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
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full p-3 
          bg-[#29282D] 
          border-2 
          border-gray-600 
          text-white 
          rounded-md 
          focus:ring-2 
          focus:ring-[#A238FF] 
          focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <option value="">Sélectionner</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
