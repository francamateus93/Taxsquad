import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";
import SelectField from "../../../components/utils/SelectField";
import LoadingSpinner from "../../../components/utils/LoadingSpinner";
import Modal from "../../../components/ui/modal/Modal";

const InvoiceForm = ({ type, onSubmit, defaultValues = {} }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.invoices);

  const initialForm = {
    number: "",
    date: "",
    client_name: "",
    client_id: "",
    client_address: "",
    city: "",
    country: "",
    concept: "",
    quantity: 0,
    price: 0,
    vat: 21,
    irpf: 0,
    currency: "EUR",
    payment_method: "",
    invoice_type: type,
    ...defaultValues,
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const hasChanged = Object.entries(defaultValues).some(
      ([key, value]) => value !== form[key]
    );
    if (hasChanged) {
      setForm((prev) => ({ ...prev, ...defaultValues }));
    }
  }, [JSON.stringify(defaultValues)]);

  const validateField = (name, value) => {
    switch (name) {
      case "number":
        return value.trim() ? "" : "Invoice number is required.";
      case "date":
        return value ? "" : "Date is required.";
      case "client_name":
        return /^[A-Za-z\s]{3,}$/.test(value)
          ? ""
          : "Client name must be at least 3 letters.";
      case "client_id":
        return /^[A-Za-z0-9]{6,}$/.test(value)
          ? ""
          : "NIF must have at least 6 alphanumeric characters.";
      case "client_address":
        return value.length >= 6 && /\d/.test(value)
          ? ""
          : "Address must have at least 6 characters and a number.";
      case "city":
      case "country":
        return /^[A-Za-z\s]+$/.test(value)
          ? ""
          : `${
              name.charAt(0).toUpperCase() + name.slice(1)
            } must contain only letters.`;
      case "concept":
        return value.length >= 3
          ? ""
          : "Concept must be at least 3 characters.";
      case "quantity":
        return /^\d+(\.\d{1,2})?$/.test(value)
          ? ""
          : "Quantity must be a valid number.";
      case "price":
        return /^\d+(\.\d{1,2})?$/.test(value)
          ? ""
          : "Price must be a valid number.";
      case "payment_method":
        return value.trim() ? "" : "Payment method is required.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched({ ...touched, [name]: true });
    const isValid = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: isValid }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in form) {
      newErrors[key] = validateField(key, form[key]);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => !err);
  };

  const calculateTotal = () => {
    const base = form.quantity * form.price;
    const vat = (base * form.vat) / 100;
    const irpf = (base * form.irpf) / 100;
    return base + vat + irpf;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({ ...form, totalAmount: calculateTotal(), type });
    setForm(initialForm);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const inputClass = (key) =>
    touched[key]
      ? errors[key]
        ? "border-2 border-red-500"
        : "border-2 border-emerald-500"
      : "border border-gray-300";

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="text-sm text-start space-y-4 bg-white p-6 rounded-xl shadow-lg  hover:shadow-xl transition duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2 mb-4">
        <div>
          <h3
            className={`text-3xl font-bold text-emerald-600 mb-1 tracking-tight ${
              type === "income" ? "text-emerald-600" : "text-red-400"
            }`}
          >
            {type === "income" ? "Income" : "Expense"} Invoice
          </h3>
          <p className="text-gray-500">Your Company Name</p>
        </div>
        <div className="text-right">
          <input
            name="number"
            placeholder="Invoice #0001"
            value={form.number}
            onChange={handleChange}
            className={`font-semibold text-lg ${inputClass(
              "number"
            )} p-2 rounded-lg w-full max-w-[150px]`}
          />
          {touched.number && errors.number && (
            <p className="text-red-500 text-xs mt-1">{errors.number}</p>
          )}
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className={`mt-2 ${inputClass(
              "date"
            )} p-2 rounded-lg w-full max-w-[150px] text-gray-400`}
          />
          {touched.date && errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>
      </div>

      {/* Client Section */}
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            name: "client_name",
            label: "Client Name",
            placeholder: "Ex: Arnau Garcia",
          },
          {
            name: "client_id",
            label: "Client ID (NIF)",
            placeholder: "Ex: 12345678X",
          },
          {
            name: "client_address",
            label: "Address",
            placeholder: "Ex: Calle Valencia, 143",
          },
          { name: "city", label: "City", placeholder: "Ex: Barcelona" },
          { name: "country", label: "Country", placeholder: "Ex: Spain" },
        ].map(({ name, label, placeholder }) => (
          <div key={name}>
            <label className="font-semibold">{label}</label>
            <input
              name={name}
              value={form[name]}
              placeholder={placeholder}
              onChange={handleChange}
              className={`p-2 rounded-lg w-full ${inputClass(name)}`}
            />
            {touched[name] && errors[name] && (
              <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Concept Section */}
        <div>
          <label className="font-semibold">Concept</label>
          <textarea
            name="concept"
            value={form.concept}
            placeholder="Ex: Design services"
            onChange={handleChange}
            className={`p-2 rounded-lg w-full ${inputClass("concept")}`}
          />
          {touched.concept && errors.concept && (
            <p className="text-red-500 text-xs mt-1">{errors.concept}</p>
          )}
        </div>
      </div>

      {/* Invoice Details Table */}
      <div className="rounded-lg p-6 border border-gray-200">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="font-semibold">Quantity</label>
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Ex: 1"
              className={`p-2 rounded-lg w-full ${inputClass("quantity")}`}
            />
            {touched.quantity && errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Ex: 2000.00"
              className={`p-2 rounded-lg w-full ${inputClass("price")}`}
            />
            {touched.price && errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="font-semibold">Payment Method</label>
            <input
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              placeholder="Ex: Bank Transfer"
              className={`p-2 rounded-lg w-full ${inputClass(
                "payment_method"
              )}`}
            />
            {touched.payment_method && errors.payment_method && (
              <p className="text-red-500 text-xs mt-1">
                {errors.payment_method}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SelectField
            label="VAT (%)"
            name="vat"
            value={form.vat}
            options={[21, 10, 5, 0]}
            onChange={handleChange}
          />
          <SelectField
            label="IRPF (%)"
            name="irpf"
            value={form.irpf}
            options={[0, -7, -15]}
            onChange={handleChange}
          />
          <SelectField
            label="Currency"
            name="currency"
            value={form.currency}
            options={["EUR", "USD", "GBP"]}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Total Section */}
      <div className="text-right text-lg font-semibold tracking-tight">
        Total:{" "}
        <span className="text-green-600 px-2">
          {calculateTotal().toFixed(2)} {form.currency}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-4">
          <Link to="/invoices">
            <ButtonSecondary type="button">Back</ButtonSecondary>
          </Link>
          <Link to="/invoices">
            <button
              type="button"
              className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 cursor-pointer transition duration-200 text-base leading-4"
            >
              Cancel
            </button>
          </Link>
        </div>
        <Button type="submit">Save Invoice</Button>
      </div>

      {showModal && (
        <Modal
          message="New Invoice created successfully!"
          onClose={() => {
            setShowModal(false);
            navigate("/invoices");
          }}
        />
      )}
    </form>
  );
};

export default InvoiceForm;
