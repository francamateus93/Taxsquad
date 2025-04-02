import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createQuarterlyTax } from "../store/slices/quarterlyTaxSlice";
import Button from "../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../components/ui/button/ButtonSecondary";
import Modal from "../components/ui/Modal";

const NewQuarterlyTax = () => {
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

  const getPlaceholder = (key) => {
    switch (key) {
      case "year":
        return "Ex: 2024";
      case "quarter":
        return "Ex: 1-4";
      default:
        return "Ex: 2000.00";
    }
  };

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border-gray-200";

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Quarterly Tax
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:grid lg:grid-cols-2 gap-6 text-start"
        >
          {Object.entries(form).map(([key, value]) => {
            const isValid = validateField(key, value);
            const showError = errors[key];

            return (
              <div key={key}>
                <label className="block font-semibold capitalize mb-1">
                  {key.replace(/_/g, " ")}*
                </label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  placeholder={getPlaceholder(key)}
                  onChange={handleChange}
                  className={`p-2 border rounded-lg w-full text-gray-500 transition duration-200 tracking-tight ${inputClass(
                    key
                  )}`}
                  required
                />
                {showError && (
                  <p className="text-red-500 text-xs mt-1">
                    {key === "year" && "Year must be exactly 4 digits."}
                    {key === "quarter" && "Quarter must be between 1 and 4."}
                    {[
                      "total_income",
                      "deductible_expenses",
                      "net_income",
                      "previous_payments",
                      "withholding_taxes",
                      "deductions",
                    ].includes(key) && "Must be a valid number."}
                  </p>
                )}
              </div>
            );
          })}

          <div className="col-span-2 flex justify-between items-center gap-4 mt-4">
            <div className="flex gap-4">
              <Button type="submit">Save Tax</Button>
              <Link to="/taxes">
                <button
                  type="button"
                  className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-200 text-base cursor-pointer"
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
            message="Quarterly tax saved successfully!"
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

export default NewQuarterlyTax;
