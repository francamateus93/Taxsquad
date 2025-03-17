import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser, setError, setLoading } from "../../store/authSlice";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/auth/firebaseAuthService.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const firebaseUser = await loginWithEmail(email, password);
      const { uid, email: userEmail, displayName } = firebaseUser || {};
      dispatch(setUser({ uid, email: userEmail, displayName }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const firebaseUser = await loginWithEmail(email, password);
      const { uid, email: userEmail, displayName } = firebaseUser || {};
      dispatch(setUser({ uid, email: userEmail, displayName }));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white p-8 md:py-14 rounded-lg shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight">
          Login
        </h2>
        <p className="mb-6 text-gray-500 tracking-tight text-xs md:text-sm">
          Enter your email and password to sign in!
        </p>
        <form
          onSubmit={handleLogin}
          className="flex flex-col text-xs md:text-sm"
        >
          <input
            className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg"
            type="email"
            placeholder="info@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2 md:p-3 mb-6 border border-gray-400 rounded-lg"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-emerald-600 text-white px-6 py-2 rounded cursor-pointer text-xs md:text-base  hover:bg-emerald-500 font-semibold"
            type="submit"
          >
            Login
          </button>
          <button
            className="mt-3 bg-gray-300 p-2 text-gray-800 rounded w-full text-xs md:text-base hover:bg-gray-400"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
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
