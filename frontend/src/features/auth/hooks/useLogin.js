import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin } from "../../../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
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

  return {
    form,
    touched,
    errors,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  };
};
