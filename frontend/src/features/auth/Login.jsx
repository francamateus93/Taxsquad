import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, googleLogin } from "../../store/slices/authSlice.js";
import Button from "../../components/ui/button/ButtonPrimary.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email address.";
      case "password":
        return /^(?=.*[A-Za-z]).{6,}$/.test(value)
          ? ""
          : "Password must be at least 6 characters, including 1 letter and 1 number.";
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
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(loginUser(form))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Login error:", err));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch((err) => console.error("Login error:", err));
  };

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-300";

  if (loading) return <LoadingSpinner />;

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 md:py-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
          Login
        </h2>
        <p className="mb-6 text-gray-500 tracking-tight text-xs md:text-sm">
          Enter your email and password to sign in!
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-xs md:text-sm"
        >
          <input
            name="email"
            type="email"
            placeholder="info@gmail.com"
            value={form.email}
            onChange={handleChange}
            className={`p-2 mb-2 tracking-tight rounded-lg ${inputClass(
              "email"
            )}`}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs text-start mb-2">
              {errors.email}
            </p>
          )}
          <input
            name="password"
            type="password"
            placeholder="Enter your Password"
            value={form.password}
            onChange={handleChange}
            className={`p-2 mb-2 tracking-tight rounded-lg ${inputClass(
              "password"
            )}`}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs text-start mb-4">
              {errors.password}
            </p>
          )}
          <Button type="submit" disabled={loading}>
            Login
          </Button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="px-6 flex justify-center items-center gap-3 py-2 mt-2 bg-emerald-50 p-2 text-gray-800 rounded-lg w-full hover:bg-emerald-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span>Login with Google</span>
          </button>
        </form>
        <p className="text-xs md:text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
