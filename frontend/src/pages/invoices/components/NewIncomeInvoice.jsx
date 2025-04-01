import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../../store/slices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";
import { useState } from "react";
import Modal from "../../../components/ui/modal/Modal";

const NewInvoiceIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (invoiceData) => {
    if (!userId) return console.error("User ID not found");
    dispatch(createInvoice({ userId, invoiceData }))
      .unwrap()
      .then(() => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/invoices");
        }, 3000);
      })
      .catch((err) => console.error("Failed to create invoice:", err));
  };

  return (
    <section className="container mx-auto p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">
          New Income Invoice
        </h2>
        <InvoiceForm type="income" onSubmit={handleCreate} />
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
    </section>
  );
};

export default NewInvoiceIncome;
