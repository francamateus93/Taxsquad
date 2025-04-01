import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slices/authSlice.js";
import LoadingSpinner from "../../components/utils/LoadingSpinner.jsx";
import Error from "../../components/utils/Error.jsx";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    date_of_birth: "",
    identification_number: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "first_name":
      case "last_name":
        return /^[A-Za-z]{3,}$/.test(value)
          ? ""
          : `${name.replace(
              "_",
              " "
            )} must have at least 3 letters and no numbers.`;

      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address.";

      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)
          ? ""
          : "Password must have at least 6 characters, one letter, and one number.";

      case "date_of_birth":
        return new Date(value) < new Date("2025-01-01")
          ? ""
          : "Birthdate must be before 2025.";

      case "identification_number":
        return /^[A-Za-z0-9]{6,}$/.test(value)
          ? ""
          : "ID number must be at least 6 characters.";

      case "phone":
        return /^\+\d{6,}$/.test(value)
          ? ""
          : "Phone must start with + and contain at least 6 digits.";

      case "address":
        return value.length >= 6 && /\d/.test(value)
          ? ""
          : "Address must be at least 6 characters and contain a number.";

      case "city":
      case "country":
        return /^[A-Za-z\s]+$/.test(value)
          ? ""
          : `${
              name.charAt(0).toUpperCase() + name.slice(1)
            } must contain only letters.`;

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const isValid = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: isValid }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      newErrors[key] = validateField(key, value);
    });
    if (!acceptedTerms) {
      newErrors.acceptedTerms = "You must accept the terms and conditions.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(registerUser(form))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error(err));
  };

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
