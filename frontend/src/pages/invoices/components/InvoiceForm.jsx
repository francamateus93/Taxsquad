import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";
import SelectField from "../../../components/utils/SelectField";
import Error from "../../../components/utils/Error";

const InvoiceForm = ({ type, onSubmit, defaultValues = {} }) => {
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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasChanged = Object.entries(defaultValues).some(
      ([key, value]) => value !== form[key]
    );
    if (hasChanged) {
      setForm((prev) => ({ ...prev, ...defaultValues }));
    }
  }, [JSON.stringify(defaultValues)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const base = form.quantity * form.price;
    const vat = (base * form.vat) / 100;
    const irpf = (base * form.irpf) / 100;
    return base + vat + irpf;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.number.trim()) newErrors.number = "Invoice number is required.";
    if (!form.date) newErrors.date = "Date is required.";
    if (!form.client_name.trim())
      newErrors.client_name = "Client name is required.";
    if (!form.quantity || isNaN(form.quantity))
      newErrors.quantity = "Quantity must be a number.";
    if (!form.price || isNaN(form.price))
      newErrors.price = "Price must be a number.";
    if (!form.payment_method.trim())
      newErrors.payment_method = "Payment method is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit({ ...form, totalAmount: calculateTotal(), type });
    setForm(initialForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputFields = [
    { label: "Invoice Number", name: "number" },
    { label: "Date", name: "date", type: "date" },
    { label: "Client Name", name: "client_name" },
    { label: "Client ID", name: "client_id" },
    { label: "Address", name: "client_address" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
    { label: "Concept", name: "concept", type: "textarea" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Price", name: "price", type: "number" },
    { label: "Payment Method", name: "payment_method" },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-sm">
      {inputFields.map(({ label, name, type = "text" }) => (
        <div key={name}>
          <label className="font-semibold">{label}</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              className={`p-2 border rounded-lg w-full h-28${errors[name]} ? "border-red-500 : border-gray-300`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className={`p-2 border rounded-lg w-full h-28${errors[name]} ? "border-red-500 : border-gray-300`}
            />
          )}
        </div>
      ))}

      {errors[name] && <Error message={errors[name]} />}

      <div className="space-y-4">
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
            <button
              type="button"
              className="px-6 py-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200 transition duration-200 text-base cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <Link to="/invoices">
            <ButtonSecondary type="button">Back</ButtonSecondary>
          </Link>
          <Button type="submit">Save Invoice</Button>
        </div>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 text-sm">
            Invoice saved successfully!
          </div>
        )}
      </div>
    </form>
  );
};

export default InvoiceForm;
