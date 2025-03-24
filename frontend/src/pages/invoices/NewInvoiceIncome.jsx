import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../store/slices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import api from "../../services/data/Api";
import Button from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";

const NewInvoiceIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const [form, setForm] = useState({
    number: "",
    invoice_type: "income",
    date: "",
    clientName: "",
    clientId: "",
    clientAddress: "",
    city: "",
    country: "",
    concept: "",
    quantity: 1,
    price: 0,
    vat: 21,
    irpf: 0,
    total: 0,
    currency: "EUR",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createInvoice({ userId, invoiceData: { ...form, invoice_type: type } })
    )
      .unwrap()
      .then(() => navigate("/invoices"));
  };

  const handleCancel = () => {
    navigate("/invoices");
  };

  // Calcular total
  const base = form.quantity * form.price;
  const vatAmount = (base * form.vat) / 100;
  const irpfAmount = (base * form.irpf) / 100;
  const total = base + vatAmount + irpfAmount;

  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await api.post("/invoices", form);
  //     navigate("/invoices");
  //   } catch (error) {
  //     console.error("Erro ao criar fatura:", error);
  //   }
  // };

  // const handleSave = (e) => {
  //   e.preventDefault();

  //   const newInvoice = {
  //     id: Date.now(),
  //     type: "income",
  //     ...form,
  //     totalAmount: total,
  //   };
  //   dispatch(addInvoice(newInvoice));
  //   navigate("/invoices");
  // };

  return (
    <section className="container mx-auto p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">
          New Expense Invoice
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm"
        >
          {/* Left column */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">Invoice Number</label>
              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Client Name</label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Client ID (CIF/NIF/NIE)</label>
              <input
                type="text"
                name="clientId"
                value={form.clientId}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="font-semibold">Address</label>
              <input
                type="text"
                name="clientAddress"
                value={form.clientAddress}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div className="pt-2">
                <p className="font-semibold text-lg">
                  Total:{" "}
                  <span className="text-green-600">{total.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Concept</label>
              <textarea
                name="concept"
                value={form.concept}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full h-28"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">VAT (%)</label>
                <select
                  name="vat"
                  value={form.vat}
                  onChange={handleChange}
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
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
                  className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
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
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Payment Method</label>
              <input
                type="text"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="p-2 mb-2 border border-gray-300 rounded-lg w-full"
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <ButtonSecondary type="button" onClick={handleCancel}>
                Cancel
              </ButtonSecondary>
              <Button type="submit">Save Invoice</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewInvoiceIncome;
