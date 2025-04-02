const AnnualSelect = ({
  name,
  value,
  options,
  handleChange,
  error,
  touched,
}) => {
  const inputClass = touched
    ? error
      ? "border-2 border-red-500"
      : "border-2 border-emerald-500"
    : "border border-gray-200";

  return (
    <>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`p-2 rounded-lg w-full text-gray-500 ${inputClass}`}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {touched && error && (
        <p className="text-red-500 text-xs mt-1 text-start">
          Please select a valid option.
        </p>
      )}
    </>
  );
};

export default AnnualSelect;
