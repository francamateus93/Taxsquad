const InputField = ({
  name,
  type,
  value,
  onChange,
  touched,
  error,
  placeholder,
}) => {
  const getBorder = () =>
    touched
      ? error
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-1 border-gray-200";

  return (
    <div className="mb-2">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`p-3 tracking-tight rounded-lg w-full ${getBorder()}`}
      />
      {touched && error && (
        <p className="text-red-500 text-xs text-start mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputField;
