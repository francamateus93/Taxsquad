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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error(err));
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen mx-auto p-4">
      <div className="w-fit bg-white p-4 md:py-14 mt-20 md:mt-0">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          Register
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm"
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
                required
                className="p-2 md:p-3 border border-gray-300 rounded-lg w-full"
              />
            </div>
          ))}

          <div className="md:col-span-2 flex gap-2 items-center my-3">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />
            <span>
              I agree to the
              <span className="text-emerald-500 font-semibold cursor-pointer">
                {" "}
                Terms and Conditions
              </span>
              , and our
              <span className="text-emerald-500 font-semibold cursor-pointer">
                {" "}
                Privacy Policy
              </span>
              .
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
