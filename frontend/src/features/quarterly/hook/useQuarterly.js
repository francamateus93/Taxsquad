import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createQuarterlyTax } from "../../../store/slices/quarterlyTaxSlice";

export const useQuarterly = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const [form, setForm] = useState({
    year: "",
    quarter: "",
    total_income: "",
    deductible_expenses: "",
    net_income: "",
    previous_payments: "",
    withholding_taxes: "",
    deductions: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "year":
        return /^\d{4}$/.test(value);
      case "quarter":
        return /^[1-4]$/.test(value);
      default:
        return /^\d+(\.\d{1,2})?$/.test(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched({ ...touched, [e.target.name]: true });
    const isValid = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      newErrors[key] = !validateField(key, value);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!userId) return alert("User not logged in");

    await dispatch(createQuarterlyTax({ userId, quarterlyData: form }))
      .unwrap()
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/documents");
        }, 4000);
      })
      .catch((err) => {
        console.error("Failed to save:", err);
      });
  };

  return {
    form,
    errors,
    touched,
    showModal,
    setShowModal,
    handleChange,
    handleSubmit,
    validateForm,
    validateField,
  };
};
