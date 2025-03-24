// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoice } from "../../store/slices/invoicesSlice";
import { useNavigate } from "react-router-dom";
import InvoiceForm from "./InvoiceForm";

const NewInvoiceIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreate = (invoiceData) => {
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const newInvoice = { ...invoiceData, user_id: userId };

    dispatch(createInvoice(newInvoice))
      .unwrap()
      .then(() => navigate("/invoices"))
      .catch((err) => console.error("Failed to create invoice:", err));
  };

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     createInvoice({ userId, invoiceData: { ...form, invoice_type: type } })
  //   )
  //     .unwrap()
  //     .then(() => navigate("/invoices"));
  // };

  // const handleCancel = () => {
  //   navigate("/invoices");
  // };

  // Calcular total
  // const base = form.quantity * form.price;
  // const vatAmount = (base * form.vat) / 100;
  // const irpfAmount = (base * form.irpf) / 100;
  // const total = base + vatAmount + irpfAmount;

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
        <InvoiceForm type="income" onSubmit={handleCreate} />
      </div>
    </section>
  );
};

export default NewInvoiceIncome;
