import React from "react";

const getPlaceholder = (key) => {
  if (key === "year") return "Ex: 2024";
  if (key === "quarter") return "Ex: 1-4";
  return "Ex: 2000.00";
};

const inputClass = (touched, errors, key) =>
  touched[key]
    ? errors[key]
      ? "border-2 border-red-500"
      : "border-2 border-emerald-500"
    : "border-gray-200";

const QuarterlyForm = ({ form, errors, touched, handleChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label className="block font-semibold capitalize mb-1">
            {key.replace(/_/g, " ")}*
          </label>
          <input
            type="text"
            name={key}
            value={value}
            placeholder={getPlaceholder(key)}
            onChange={handleChange}
            className={`p-2 border rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${inputClass(
              touched,
              errors,
              key
            )}`}
            required
          />
          {errors[key] && (
            <p className="text-red-500 text-xs mt-1">
              {key === "year" && "Year must be exactly 4 digits."}
              {key === "quarter" && "Quarter must be between 1 and 4."}
              {[
                "total_income",
                "deductible_expenses",
                "net_income",
                "previous_payments",
                "withholding_taxes",
                "deductions",
              ].includes(key) && "Must be a valid number."}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuarterlyForm;
