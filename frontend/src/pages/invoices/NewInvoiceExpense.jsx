import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../store/slices/invoicesSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";

const initialForm = {
  number: "",
  invoice_type: "expense",
  date: "",
  client_name: "",
  client_id: "",
  client_address: "",
  city: "",
  country: "",
  concept: "",
  quantity: "",
  price: 0,
  vat: 21,
  irpf: 0,
  currency: "EUR",
  payment_method: "",
};

const NewInvoiceExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const [form, setForm] = useState({ initialForm });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setForm(initialForm);
    navigate("/invoices");
  };

  const hangleBack = () => {
    navigate("/invoices");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      ...form,
      userId,
      invoice_type: "expense",
      total_amount: calculateTotal(),
    };

    try {
      await dispatch(createInvoice(invoiceData)).unwrap();
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/invoices");
      }, 2000);
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
  };

  const calculateTotal = () => {
    const base = form.quantity * form.price;
    const vatAmount = (base * form.vat) / 100;
    const irpfAmount = (base * form.irpf) / 100;
    return base + vatAmount + irpfAmount;
  };

  const total = calculateTotal();

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
              <Link to="/invoices">
                <ButtonSecondary type="button">Cancel</ButtonSecondary>
              </Link>
              <Button type="submit">Save Invoice</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewInvoiceExpense;
