import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../../store/slices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";

const NewInvoiceIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);

  const handleCreate = (invoiceData) => {
    if (!userId) return console.error("User ID not found");
    dispatch(createInvoice({ userId, invoiceData }))
      .unwrap()
      .then(() => navigate("/invoices"))
      .catch((err) => console.error("Failed to create invoice:", err));
  };

  return (
    <section className="container mx-auto p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">
          New Expense Invoice
        </h2>
        <InvoiceForm type="income" onSubmit={handleCreate} />
      </div>
    </section>
  );
};

export default NewInvoiceIncome;
