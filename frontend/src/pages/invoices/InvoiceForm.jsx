import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";
import SelectField from "../../components/utils/SelectedField";

const fields = [
  { name: "number", label: "Invoice Number" },
  { name: "date", label: "Date", type: "date" },
  { name: "clientName", label: "Client Name" },
  { name: "clientId", label: "Client ID (CIF/NIF/NIE)" },
  { name: "clientAddress", label: "Address" },
  { name: "city", label: "City" },
  { name: "country", label: "Country" },
  { name: "concept", label: "Concept", type: "textarea" },
  { name: "quantity", label: "Quantity", type: "number" },
  { name: "price", label: "Price", type: "number" },
  { name: "paymentMethod", label: "Payment Method" },
];

const VAT_OPTIONS = [21, 10, 5, 0];
const IRPF_OPTIONS = [0, -7, -15];
const CURRENCY_OPTIONS = ["EUR", "USD", "GBP"];

const InvoiceForm = ({ type, onSubmit, defaultValues = {} }) => {
  const [form, setForm] = useState({
    number: "",
    date: "",
    clientName: "",
    clientId: "",
    clientAddress: "",
    city: "",
    country: "",
    concept: "",
    quantity: 0,
    price: 0,
    vat: 21,
    irpf: 0,
    currency: "EUR",
    paymentMethod: "",
    ...defaultValues,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, totalAmount: calculateTotal(), type });
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-sm">
      {fields.map(({ label, name, type = "text" }) => (
        <div key={name}>
          <label className="font-semibold">{label}</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full h-28"
            />
          ) : (
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          )}
        </div>
      ))}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="VAT (%)"
            name="vat"
            value={form.vat}
            options={VAT_OPTIONS}
            onChange={handleChange}
          />
          <SelectField
            label="IRPF (%)"
            name="irpf"
            value={form.irpf}
            options={IRPF_OPTIONS}
            onChange={handleChange}
          />
        </div>

        <SelectField
          label="Currency"
          name="currency"
          value={form.currency}
          options={CURRENCY_OPTIONS}
          onChange={handleChange}
        />

        <p className="font-semibold text-lg">
          Total:{" "}
          <span className="text-green-600">{calculateTotal().toFixed(2)}</span>
        </p>

        <div className="flex justify-end gap-4 mt-4">
          <Link to="/invoices">
            <ButtonSecondary type="button">Cancel</ButtonSecondary>
          </Link>
          <Button type="submit">Save Invoice</Button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
