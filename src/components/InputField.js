const InputField = ({ id, label, type }) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-300 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="w-full p-3 bg-[#29282D] text-white rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
    />
  </div>
);

export default InputField;
