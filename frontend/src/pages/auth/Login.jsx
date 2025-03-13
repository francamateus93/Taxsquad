import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setError, setLoading } from "../../store/authSlice";
import {
  loginWithEmail,
  loginWithGoogle,
} from "../../services/auth/firebaseAuthService.js";
import Navbar from "../../components/Navbar/Navbar";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            className="p-2 mb-2 border rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-2 mb-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-green-600 text-white p-2 rounded" type="submit">
            Login
          </button>
        </form>
        <button
          className="mt-4 bg-red-500 text-white p-2 rounded w-full"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
