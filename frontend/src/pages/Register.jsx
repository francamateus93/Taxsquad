import { useRegister } from "../features/auth/hooks/useRegister.js";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import Error from "../components/ui/Error.jsx";

const Register = () => {
  const {
    form,
    touched,
    errors,
    loading,
    error,
    acceptedTerms,
    setAcceptedTerms,
    handleChange,
    handleSubmit,
  } = useRegister();

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-200";

  if (loading) return <LoadingSpinner />;

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-xl mx-auto p-10 bg-white rounded-2xl mt-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center tracking-tight">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-start"
        >
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block mb-1 font-semibold capitalize tex-start">
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
              <span className="text-emerald-600 font-semibold  cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and our{" "}
              <span className="text-emerald-600 font-semibold  cursor-pointer">
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

        <p className="text-xs md:text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
