import React from "react";
import Error from "../../../../components/ui/Error.jsx";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner.jsx";

const RegisterForm = ({
  form,
  touched,
  errors,
  acceptedTerms,
  setAcceptedTerms,
  handleChange,
  handleSubmit,
  inputClass,
  loading,
  error,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-start"
    >
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-1 font-semibold capitalize">
            {key.replace("_", " ")}*
          </label>
          <input
            type={
              key === "date_of_birth"
                ? "date"
                : key === "password"
                ? "password"
                : "text"
            }
            name={key}
            value={value}
            placeholder={`Enter ${key.replace("_", " ")}`}
            onChange={handleChange}
            className={`p-2 rounded-lg w-full tracking-tight text-gray-500 ${inputClass(
              key
            )}`}
          />
          {touched[key] && errors[key] && (
            <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
          )}
        </div>
      ))}

      <div className="md:col-span-2 flex gap-2 items-start my-1">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1"
        />
        <span className="text-xs md:text-sm text-gray-600">
          I agree to the{" "}
          <span className="text-emerald-600 font-semibold cursor-pointer">
            Terms and Conditions
          </span>{" "}
          and our{" "}
          <span className="text-emerald-600 font-semibold cursor-pointer">
            Privacy Policy
          </span>
          .
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms}</p>
          )}
        </span>
      </div>

      <button
        type="submit"
        disabled={loading || !acceptedTerms}
        className="md:col-span-2 px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 cursor-pointer transition duration-200 text-base font-semibold leading-4"
      >
        {loading ? <LoadingSpinner /> : "Register"}
      </button>

      {error && <Error message={error} />}
    </form>
  );
};

export default RegisterForm;
