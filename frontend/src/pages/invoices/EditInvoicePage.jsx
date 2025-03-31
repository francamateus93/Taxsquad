import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateInvoice,
  fetchInvoicesByType,
} from "../../store/slices/invoicesSlice";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";
import Modal from "../../components/ui/modal/Modal";

const EditInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

  const [invoiceData, setInvoiceData] = useState({
    client_name: "",
    date: "",
    total_amount: "",
    invoice_type: "income",
  });

  const [showModal, setShowModal] = useState(false);

  // Carrega faturas ao abrir página
  useEffect(() => {
    if (userId) dispatch(fetchInvoicesByType({ userId, type: "all" }));
  }, [dispatch, userId]);

  // Carrega dados da fatura no form
  useEffect(() => {
    const invoice = invoices.find((inv) => inv.id.toString() === id);
    if (invoice) {
      setInvoiceData({
        client_name: invoice.client_name,
        date: invoice.date.split("T")[0],
        total_amount: invoice.total_amount,
        invoice_type: invoice.invoice_type,
      });
    }
  }, [invoices, id]);

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateInvoice({ userId, invoiceId: id, invoiceData }));
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/invoices");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Error message={error} />;

  return (
    <section className="container mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Edit Invoice</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Client Name</label>
          <input
            name="client_name"
            value={invoiceData.client_name}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={invoiceData.date}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Total Amount (€)</label>
          <input
            type="number"
            name="total_amount"
            value={invoiceData.total_amount}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Type</label>
          <select
            name="invoice_type"
            value={invoiceData.invoice_type}
            onChange={handleChange}
            className="border rounded p-2"
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          Save Changes
        </button>
      </form>

      {showModal && (
        <Modal onClose={handleConfirm}>
          <div className="flex flex-col gap-4 items-center">
            <p className="text-lg font-semibold text-emerald-600">
              Invoice updated successfully!
            </p>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              OK
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default EditInvoicePage;
