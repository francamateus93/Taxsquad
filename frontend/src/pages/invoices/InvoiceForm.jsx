import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";

const InvoiceForm = ({ type, onSubmit, defaultValues }) => {
  const initialFormState = {
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
  };

  const [form, setForm] = useState(defaultValues || initialFormState);

  useEffect(() => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  }, [defaultValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "quantity" ||
        name === "vat" ||
        name === "irpf"
          ? Number(value)
          : value,
    }));
  };

  const base = form.quantity * form.price;
  const vatAmount = (base * form.vat) / 100;
  const irpfAmount = (base * form.irpf) / 100;
  const total = base + vatAmount + irpfAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      type,
      totalAmount: total,
    });
  };

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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm"
    >
      {fields.map(({ name, label, type = "text" }) => (
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

      {/* VAT, IRPF, Currency */}
      <div className="space-y-4 col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">VAT (%)</label>
            <select
              name="vat"
              value={form.vat}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              {[21, 10, 5, 0].map((v) => (
                <option key={v} value={v}>
                  {v}%
                </option>
              ))}
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
              {[0, -7, -15].map((v) => (
                <option key={v} value={v}>
                  {v}%
                </option>
              ))}
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
            {["EUR", "USD", "GBP"].map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        {/* Total */}
        <p className="font-semibold text-lg">
          Total: <span className="text-green-600">{total.toFixed(2)}</span>
        </p>

        {/* Buttons */}
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
