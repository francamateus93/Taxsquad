import jsPDF from "jspdf";
import emailjs from "emailjs-com";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchInvoicesByType,
  deleteInvoice,
} from "../../../store/slices/invoicesSlice";

export const useInvoices = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const userEmail = useSelector((state) => state.auth.user.email);

  const { invoices, loading, error } = useSelector((state) => state.invoices);

  const [invoiceType, setInvoiceType] = useState("income");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [openMenuId, setOpenMenuId] = useState(null);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const menuRef = useRef();

  useEffect(() => {
    if (userId) {
      dispatch(fetchInvoicesByType({ userId, type: invoiceType }));
    }
  }, [dispatch, userId, invoiceType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [invoiceType, dateFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortInvoices = (a, b) => {
    if (sortField === "client_name") {
      return sortOrder === "asc"
        ? a.client_name.localeCompare(b.client_name)
        : b.client_name.localeCompare(a.client_name);
    }
    if (sortField === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortField === "total_amount") {
      return sortOrder === "asc"
        ? a.total_amount - b.total_amount
        : b.total_amount - a.total_amount;
    }
    return 0;
  };

  const filteredInvoices = invoices
    .filter((invoice) => {
      if (!dateFilter) return true;
      return invoice.date >= dateFilter;
    })
    .sort(sortInvoices);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleInvoiceClick = (invoice) => {
    console.log("Invoice clicked:", invoice);
  };

  const handleDownload = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Invoice #${invoice.number}`, 10, 10);
    doc.text(`Client: ${invoice.client_name}`, 10, 20);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 10, 30);
    doc.text(`Total Amount: ${invoice.total_amount}€`, 10, 40);
    doc.save(`Invoice-${invoice.number}.pdf`);
  };

  const handleEmail = (invoice) => {
    emailjs
      .send(
        "SERVICE_ID",
        "TEMPLATE_ID",
        {
          client_name: invoice.client_name,
          invoice_number: invoice.number,
          invoice_date: new Date(invoice.date).toLocaleDateString(),
          total_amount: invoice.total_amount,
          to_email: userEmail,
        },
        "USER_ID"
      )
      .then(() => alert("Invoice sent successfully!"))
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("Failed to send invoice by email.");
      });
  };

  const handleConfirmDelete = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModalDelete(true);
  };

  const handleDelete = (invoice) => {
    dispatch(deleteInvoice({ userId, invoiceId: selectedInvoice.id }));
    setShowModalDelete(false);
  };

  return {
    paginatedInvoices,
    invoiceType,
    setInvoiceType,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    toggleMenu,
    openMenuId,
    setOpenMenuId,
    handleSort,
    sortField,
    sortOrder,
    handleInvoiceClick,
    handleDownload,
    handleEmail,
    handleConfirmDelete,
    showModalDelete,
    setShowModalDelete,
    selectedInvoice,
    setSelectedInvoice,
    handleDelete,
    menuRef,
  };
};
