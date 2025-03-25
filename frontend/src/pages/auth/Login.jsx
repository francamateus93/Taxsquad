import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, googleLogin } from "../../store/slices/authSlice.js";
import Button from "../../components/ui/button/ButtonPrimary.jsx";
import Error from "../../components/utils/Error.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
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
            className="p-2 md:p-3 mb-2 border border-gray-300 rounded-lg"
            type="email"
            placeholder="info@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2 md:p-3 mb-6 border border-gray-300 rounded-lg"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            Login
          </Button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="px-6 py-2 mt-3 bg-gray-200 p-2 text-gray-800 rounded-lg w-full text-xs md:text-sm hover:bg-gray-300"
          >
            Login with Google
          </button>
          {error && <Error message={error} />}
        </form>
        <p className="text-xs md:text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-emerald-500 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
