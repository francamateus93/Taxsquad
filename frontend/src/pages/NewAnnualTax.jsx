import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAnnualTax } from "../store/slices/annualTaxSlice";
import Button from "../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../components/ui/button/ButtonSecondary";
import Modal from "../components/ui/Modal";

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

const NewAnnualTax = () => {
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

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-200";

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

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Annual Tax
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start"
        >
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block font-semibold capitalize mb-1">
                {key.replace(/_/g, " ")}*
              </label>

              {key === "marital_status" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-2  rounded-lg w-full text-gray-500 ${inputClass(
                    key
                  )}`}
                >
                  <option value="">Select marital status</option>
                  {maritalStatusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : key === "autonomous_community" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className={`p-2  rounded-lg w-full text-gray-500 ${inputClass(
                    key
                  )}`}
                >
                  <option value="">Select community</option>
                  {autonomousCommunities.map((region) => (
                    <option key={region}>{region}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    [
                      "income_from_work",
                      "business_income",
                      "capital_gains",
                      "deductions",
                    ].includes(key)
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={getPlaceholder(key)}
                  className={`p-2 rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${inputClass(
                    key
                  )}`}
                />
              )}

              {touched[key] && errors[key] && (
                <p className="text-red-500 text-xs mt-1 text-start">
                  {key === "year" && "Year must be 4 digits."}
                  {["taxpayer_nif", "spouse_nif"].includes(key) &&
                    "NIF must have at least 6 characters."}
                  {key === "marital_status" &&
                    "Please select a marital status."}
                  {key === "autonomous_community" &&
                    "Please select an autonomous community."}
                  {[
                    "income_from_work",
                    "business_income",
                    "capital_gains",
                    "deductions",
                  ].includes(key) && "Must be a valid number (e.g., 2000.00)."}
                  {key === "address" && "Address is required."}
                  {key === "taxpayer_name" && "Taxpayer name is required."}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-3 flex justify-between items-center gap-4 mt-4">
            <div className="flex gap-4">
              <Button type="submit">Save Tax</Button>
              <Link to="/taxes">
                <button
                  type="button"
                  className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition"
                >
                  Cancel
                </button>
              </Link>
            </div>
            <Link to="/taxes">
              <ButtonSecondary type="button">Back</ButtonSecondary>
            </Link>
          </div>
        </form>

        {showModal && (
          <Modal
            message="Annual tax saved successfully!"
            onClose={() => {
              setShowModal(false);
              navigate("/documents");
            }}
          />
        )}
      </div>
    </section>
  );
};

export default NewAnnualTax;
