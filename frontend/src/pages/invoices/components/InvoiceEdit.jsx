import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateInvoice } from "../../store/slices/invoicesSlice";
import InvoiceForm from "../../components/InvoiceForm";
import Modal from "../../components/utils/Modal";

const InvoiceEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) =>
    state.invoices.invoices.find((inv) => inv.id === Number(id))
  );

  const [formData, setFormData] = useState(invoice);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateInvoice({
        userId: invoice.user_id,
        invoiceId: id,
        invoiceData: formData,
      })
    )
      .unwrap()
      .then(() => {
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/invoices");
  };

  if (!invoice) return <div>Invoice not found</div>;

  return (
    <>
      <InvoiceForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />

      {showModal && (
        <Modal title="Invoice Updated" onClose={closeModal}>
          <p>The invoice has been updated successfully!</p>
          <button onClick={closeModal}>OK</button>
        </Modal>
      )}
    </>
  );
};

export default InvoiceEdit;
