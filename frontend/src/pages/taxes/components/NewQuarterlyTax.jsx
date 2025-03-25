import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQuarterlyDoc } from "../quarterlyTaxSlice";

const NewQuarterlyTax = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);

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

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not logged in");

    await dispatch(createQuarterlyDoc({ userId, formData: form }))
      .unwrap()
      .then(() => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to save:", err);
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Quarterly Tax Form</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block font-semibold capitalize">
              {key.replace(/_/g, " ")}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-emerald-600 text-white py-2 rounded hover:bg-emerald-500 transition"
        >
          Save
        </button>
      </form>

      {showModal && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-3 rounded">
          Quarterly Tax Form saved successfully!
        </div>
      )}
    </div>
  );
};

export default NewQuarterlyTax;