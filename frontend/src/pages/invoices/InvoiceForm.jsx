import { useState, useEffect } from "react";
import Button from "../ui/ButtonPrimary";
import ButtonSecondary from "../ui/ButtonSecondary";
import { Link } from "react-router-dom";

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
    if (defaultValues) setForm((prev) => ({ ...prev, ...defaultValues }));
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const base = form.quantity * form.price;
  const vatAmount = (base * form.vat) / 100;
  const irpfAmount = (base * form.irpf) / 100;
  const total = base + vatAmount + irpfAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      totalAmount: total,
      type,
    });
  };

  const inputFields = [
    { label: "Invoice Number", name: "number" },
    { label: "Date", name: "date", type: "date" },
    { label: "Client Name", name: "clientName" },
    { label: "Client ID", name: "clientId" },
    { label: "Address", name: "clientAddress" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
    { label: "Concept", name: "concept", type: "textarea" },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Price", name: "price", type: "number" },
    { label: "Payment Method", name: "paymentMethod" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm"
    >
      {inputFields.map(({ label, name, type = "text" }) => (
        <div key={name} className="space-y-1">
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
          <div>
            <label className="font-semibold">VAT (%)</label>
            <select
              name="vat"
              value={form.vat}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value={21}>21%</option>
              <option value={10}>10%</option>
              <option value={5}>5%</option>
              <option value={0}>0%</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">IRPF (%)</label>
            <select
              name="irpf"
              value={form.irpf}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value={0}>0%</option>
              <option value={-7}>-7%</option>
              <option value={-15}>-15%</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-semibold">Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <p className="font-semibold text-lg">
          Total: <span className="text-green-600">{total.toFixed(2)}</span>
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
