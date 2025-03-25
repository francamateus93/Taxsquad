import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAnnualTax } from "../../../store/slices/annualTaxSlice";
import Button from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";

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

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("User not logged in");

    await dispatch(createAnnualTax({ userId, annualData: form }))
      .unwrap()
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/documents");
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to save:", err);
      });
  };

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20">
      <div className="max-w-5xl mx-auto bg-white p-6">
        <h2 className="text-2xl font-bold mb-8 text-center tracking-tighter">
          Annual Tax
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-start"
        >
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block font-semibold capitalize">
                {key.replace(/_/g, " ")}
              </label>
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
                className="p-2 md:p-3 border border-gray-300 rounded-lg w-full text-gray-500"
                required
              />
            </div>
          ))}

          <div className="flex justify-start gap-4 mt-4">
            <Button type="submit">Save Tax</Button>
            <Link to="/documents">
              <button
                type="button"
                className="px-6 py-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200 text-base cursor-pointer"
              >
                Cancel
              </button>
            </Link>
            <Link to="/documents">
              <ButtonSecondary type="button">Back</ButtonSecondary>
            </Link>
          </div>
        </form>

        {showModal && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-3 rounded">
            Annual Tax Form saved successfully!
          </div>
        )}
      </div>
    </section>
  );
};

export default NewAnnualTax;
