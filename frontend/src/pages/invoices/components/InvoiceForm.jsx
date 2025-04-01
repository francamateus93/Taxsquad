import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";
import SelectField from "../../../components/utils/SelectField";
import Error from "../../../components/utils/Error";
import Modal from "../../../components/ui/modal/Modal";

const InvoiceForm = ({ type, onSubmit, defaultValues = {} }) => {
  const navigate = useNavigate();

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

  const inputFields = [
    { label: "Invoice Number", name: "number", placeholder: "Ex: 0001" },
    { label: "Date", name: "date", type: "date", placeholder: "" },
    {
      label: "Client Name",
      name: "client_name",
      placeholder: "Ex: Arnau Garcia",
    },
    { label: "Client ID", name: "client_id", placeholder: "Ex: 12345678X" },
    {
      label: "Address",
      name: "client_address",
      placeholder: "Ex: Calle Valencia, 143",
    },
    { label: "City", name: "city", placeholder: "Ex: Barcelona" },
    { label: "Country", name: "country", placeholder: "Ex: Spain" },
    {
      label: "Concept",
      name: "concept",
      type: "textarea",
      placeholder: "Ex: Design services",
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "Ex: 1",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Ex: 2000.00",
    },
    {
      label: "Payment Method",
      name: "payment_method",
      placeholder: "Ex: Bank transfer",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-6 text-sm text-start"
    >
      {inputFields.map(({ label, name, type = "text", placeholder }) => (
        <div key={name}>
          <label className="font-semibold">{label}</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={form[name]}
              placeholder={placeholder}
              onChange={handleChange}
              className={`p-2 rounded-lg w-full h-18 tracking-tight ${inputClass(
                name
              )}`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={form[name]}
              placeholder={placeholder}
              onChange={handleChange}
              className={`p-2 rounded-lg w-full tracking-tight ${inputClass(
                name
              )}`}
            />
          )}
          {touched[name] && errors[name] && (
            <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
          )}
        </div>
      ))}

      <div className="space-y-4 md:col-span-2">
        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <SelectField
          label="Currency"
          name="currency"
          value={form.currency}
          options={["EUR", "USD", "GBP"]}
          onChange={handleChange}
        />

        <p className="font-semibold text-lg">
          Total:{" "}
          <span className="text-green-600">{calculateTotal().toFixed(2)}</span>
        </p>

        <div className="flex justify-end gap-4 mt-4">
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
      </div>
    </form>
  );
};

export default InvoiceForm;
