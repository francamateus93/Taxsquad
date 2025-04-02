import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAnnualTax } from "../../../store/slices/annualTaxSlice";

export const useAnnual = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const [form, setForm] = useState({
    year: "",
    taxpayer_name: "",
    taxpayer_nif: "",
    spouse_name: "",
    spouse_nif: "",
    marital_status: "",
    address: "",
    autonomous_community: "",
    income_from_work: "",
    business_income: "",
    capital_gains: "",
    deductions: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showModal, setShowModal] = useState(false);

  const autonomousCommunities = [
    "Andalucía",
    "Aragón",
    "Asturias",
    "Islas Baleares",
    "Cantabria",
    "Castilla La Mancha",
    "Castilla y León",
    "Catalunya",
    "Comunitat Valenciana",
    "Extremadura",
    "Galicia",
    "La Rioja",
    "Comunidad de Madrid",
    "Región de Murcia",
    "Comunidad Foral de Navarra",
    "País Vasco",
    "Ceuta",
    "Melilla",
  ];

  const maritalStatusOptions = ["Single", "Married", "Divorced"];

  const validateField = (name, value) => {
    switch (name) {
      case "year":
        return /^\d{4}$/.test(value);
      case "taxpayer_nif":
      case "spouse_nif":
        return value.length >= 6;
      case "marital_status":
        return maritalStatusOptions.includes(value);
      case "autonomous_community":
        return autonomousCommunities.includes(value);
      case "income_from_work":
      case "business_income":
      case "capital_gains":
      case "deductions":
        return /^\d+(\.\d{1,2})?$/.test(value);
      default:
        return value.trim() !== "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const isValid = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      newErrors[name] = !validateField(name, value);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await dispatch(createAnnualTax({ userId, annualData: form }))
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

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-200";

  const getPlaceholder = (key) => {
    switch (key) {
      case "year":
        return "Ex: 2024";
      case "taxpayer_nif":
      case "spouse_nif":
        return "Ex: 12345678Z";
      case "income_from_work":
      case "business_income":
      case "capital_gains":
      case "deductions":
        return "Ex: 2000.00";
      case "address":
        return "Ex: Calle Mayor 123";
      default:
        return `Enter ${key.replace(/_/g, " ")}`;
    }
  };

  return {
    form,
    errors,
    touched,
    showModal,
    handleChange,
    handleSubmit,
    setShowModal,
    autonomousCommunities,
    maritalStatusOptions,
  };
};
