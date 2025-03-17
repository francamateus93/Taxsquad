import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xl bg-white rounded-lg p-2 md:py-14  mt-20 md:0">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center tracking-tight">
          Register
        </h2>
        <form
          onSubmit={handleRegister}
          className="flex flex-col md:grid md:grid-cols-2 gap-2 text-start text-xs md:text-sm text-gray-500"
        >
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              First Name*
            </label>
            <input
              name="first_name"
              type="text"
              placeholder="Enter First Name"
              value={form.first_name}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Last Name*
            </label>
            <input
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Email*
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={form.email}
              onChange={handleChange}
              className="col-span-2 p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Password*
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={handleChange}
              className="col-span-2 p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Birth Date*
            </label>
            <input
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Identification number*
            </label>
            <input
              name="identification_number"
              type="text"
              placeholder="Enter your ID Number"
              value={form.identification_number}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Phone*
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter your Phone"
              value={form.phone}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              Adress*
            </label>
            <input
              name="address"
              type="text"
              placeholder="Enter your Address"
              value={form.address}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold tracking-tight text-xs md:text-sm">
              City*
            </label>
            <input
              name="city"
              type="text"
              placeholder="Enter your City"
              value={form.city}
              onChange={handleChange}
              className="p-2 md:p-3 mb-2 border border-gray-400 rounded-lg w-full md:w-fit"
              required
            />
          </div>
          <div className="col-span-2 flex gap-2 items-center my-3">
            <input type="checkbox" name="checkbox" className="" required />
            <span>
              I agree to the{" "}
              <span className="text-emerald-500 font-semibold cursor-pointer">
                Terms and Conditions
              </span>
              , and our{" "}
              <span className="text-emerald-500 font-semibold cursor-pointer">
                Privacy Policy
              </span>
              .
            </span>
          </div>

          <button
            className="col-span-2 bg-emerald-600 text-white px-6 py-2 rounded text-xs md:text-base cursor-pointer hover:bg-emerald-500 font-semibold text-center"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-xs md:text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-emerald-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
