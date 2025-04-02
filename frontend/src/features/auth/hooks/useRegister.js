import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/slices/authSlice";

export const useRegister = () => {
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

  return {
    form,
    touched,
    errors,
    loading,
    error,
    acceptedTerms,
    setAcceptedTerms,
    handleChange,
    handleSubmit,
    inputClass,
  };
};
