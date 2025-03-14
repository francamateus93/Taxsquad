import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setError, setLoading } from "../../store/authSlice";
import { registerWithEmail } from "../../services/auth/firebaseAuthService.js";
import api from "../../services/data/Api";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const firebaseUser = await registerWithEmail(email, password);
      await api.post("/users", {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        date_of_birth: form.date_of_birth,
        identification_number: form.identification_number,
        phone: form.phone,
        address: form.address,
        city: form.city,
        uid: firebaseUser.uid,
      });
      dispatch(setUser(firebaseUser));
      navigate("/dashboard");
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form
          onSubmit={handleRegister}
          className="grid grid-cols-2 gap-4 text-start"
        >
          <div>
            <label className="block font-semibold">First Name</label>
            <input
              name="first_name"
              type="text"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Last Name</label>
            <input
              name="last_name"
              type="text"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="col-span-2 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="col-span-2 p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Birth Date</label>
            <input
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Identification number</label>
            <input
              name="identification_number"
              type="text"
              placeholder="ID Number"
              value={form.identification_number}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Adress</label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">City</label>
            <input
              name="city"
              type="text"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div className="col-span-2 flex items-center">
            <input type="checkbox" name="privacy" className="m-2" required />
            <span>I agree to the terms of service and privacy policy.</span>
          </div>

          <button
            className="col-span-2 bg-green-600 text-white p-2 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
