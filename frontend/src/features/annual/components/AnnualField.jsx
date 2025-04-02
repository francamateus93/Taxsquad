const getPlaceholder = (key) => {
  switch (key) {
    case "year":
      return "Ex: 2024";
    case "taxpayer_nif":
    case "spouse_nif":
      return "Ex: 12345678Z";
    case "income_from_work":
    case "business_income":
    case "capital_gains":
    case "deductions":
      return "Ex: 2000.00";
    case "address":
      return "Ex: Calle Mayor 123";
    default:
      return `Enter ${key.replace(/_/g, " ")}`;
  }
};

const AnnualField = ({ name, value, handleChange, error, touched }) => {
  const inputClass = touched
    ? error
      ? "border-2 border-red-500"
      : "border-2 border-emerald-500"
    : "border border-gray-200";

  const isNumericField = [
    "income_from_work",
    "business_income",
    "capital_gains",
    "deductions",
  ].includes(name);

  return (
    <>
      <input
        type={isNumericField ? "number" : "text"}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={getPlaceholder(name)}
        className={`p-2 rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${inputClass}`}
      />
      {touched && error && (
        <p className="text-red-500 text-xs mt-1 text-start">Invalid field.</p>
      )}
    </>
  );
};

export default AnnualField;
