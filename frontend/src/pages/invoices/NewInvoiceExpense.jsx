import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../store/invoicesSlice";
import { useNavigate } from "react-router-dom";

const NewInvoiceExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    number: "",
    date: "",
    clientName: "",
    clientId: "",
    clientAddress: "",
    city: "",
    country: "",
    concept: "",
    quantity: "",
    price: 0,
    vat: 21,
    irpf: 0,
    currency: "EUR",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Calcular total
  const base = form.quantity * form.price;
  const vatAmount = (base * form.vat) / 100;
  const irpfAmount = (base * form.irpf) / 100;
  const total = base + vatAmount + irpfAmount;

  const handleSave = (e) => {
    e.preventDefault();
    // Montamos o objeto Invoice
    const newInvoice = {
      id: Date.now(),
      type: "expense",
      number: form.number,
      date: form.date,
      clientName: form.clientName,
      clientId: form.clientId,
      address: form.clientAddress,
      city: form.city,
      country: form.country,
      concept: form.concept,
      quantity: form.quantity,
      price: form.price,
      vat: form.vat,
      irpf: form.irpf,
      currency: form.currency,
      paymentMethod: form.paymentMethod,
      totalAmount: total,
    };

    // Adicionamos ao Redux (ou enviamos ao backend)
    dispatch(addInvoice(newInvoice));

    // Redirecionar para Invoices
    navigate("/invoices");
  };

  const handleCancel = () => {
    navigate("/invoices");
  };

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">New Income Expensive</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="block font-semibold">Invoice Number</label>
          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Client ID (CIF/NIF/NIE)</label>
          <input
            type="text"
            name="clientId"
            value={form.clientId}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            name="clientAddress"
            value={form.clientAddress}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Country</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Concept</label>
          <textarea
            name="concept"
            value={form.concept}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div>
            <label className="block font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div>
            <label className="block font-semibold">VAT (%)</label>
            <select
              name="vat"
              value={form.vat}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value={21}>21%</option>
              <option value={10}>10%</option>
              <option value={5}>5%</option>
              <option value={0}>0%</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">IRPF (%)</label>
            <select
              name="irpf"
              value={form.irpf}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value={0}>0%</option>
              <option value={-7}>-7%</option>
              <option value={-15}>-15%</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Currency</label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="border rounded w-full p-2"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Payment Method</label>
          <input
            type="text"
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>

        <div>
          <p className="font-semibold">
            Total: <span className="text-green-600">{total.toFixed(2)}</span>
          </p>
        </div>

        <div className="space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            Save Invoice
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewInvoiceExpense;
