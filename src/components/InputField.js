const InputField = ({ id, label, type, value, onChange }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-400 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-3 bg-[#29282D] text-white rounded-md focus:ring-2 focus:ring-[#A238FF] focus:outline-none"
    />
  </div>
);

export default InputField;
