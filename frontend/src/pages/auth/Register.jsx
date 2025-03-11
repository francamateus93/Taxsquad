import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setError, setLoading } from "../../store/authSlice";
import { registerWithEmail } from "../../services/firebaseAuthService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const user = await registerWithEmail(email, password);
      dispatch(setUser(user));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
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
          <div>
            <input type="checkbox" name="privacy" className="m-2" required />
            <span>I agree to the terms of service and privacy policy.</span>
          </div>

          <button className="bg-green-600 text-white p-2 rounded" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
