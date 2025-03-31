import jsPDF from "jspdf";
import emailjs from "emailjs-com";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchInvoicesByType,
  deleteInvoice,
} from "../../store/slices/invoicesSlice";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const userEmail = useSelector((state) => state.auth.user.email);

  const { invoices, loading, error } = useSelector((state) => state.invoices);

  const [invoiceType, setInvoiceType] = useState("income");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const handleEdit = (invoice) => {
    navigate(`/invoices/edit/${invoice.id}`);
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

  return (
    <section className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-end space-x-2">
        {/* Income / Expense Toggle */}
        <div className="flex space-x-2">
          {["income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setInvoiceType(type)}
              className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
                invoiceType === type
                  ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600"
                  : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200"
              } transition duration-200`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 space-x-2 justify-end">
          {/* Date Filter */}
          <div className="flex items-center space-x-1 text-gray-500">
            <label className="font-semibold text-sm">Filter:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border-none text-sm"
            />
          </div>

          {/* Buttons New Invoices */}
          <div className="flex items-center space-x-2">
            <Link to="/invoices/new-income">
              <button className="px-5 py-2 font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition text-sm cursor-pointer">
                + New Income
              </button>
            </Link>
            <Link to="/invoices/new-expense">
              <button className="px-5 py-2 font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-red-200 hover:text-red-600 transition text-sm cursor-pointer">
                + New Expense
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] overflow-y-auto hover:shadow-lg transition duration-300">
        <div className="grid grid-cols-4  px-4 py-2 text-start font-semibold">
          <div className="flex items-center space-x-1">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleSort("client_name")}
            >
              <p>Name</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-4 h-4"
              />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <p>Date</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-4 h-4"
              />
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <p>Amount</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-4 h-4"
              />
            </div>
          </div>
          <div className="justify-self-end">
            <p>Actions</p>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <Error message={error} />}
        {!loading && !error && paginatedInvoices.length === 0 && (
          <p className="text-center text-gray-500 p-4">No invoices found</p>
        )}

        {!loading &&
          !error &&
          paginatedInvoices.map((invoice) => (
            <div
              key={invoice.number}
              className="grid grid-cols-4 items-center text-start px-4 py-2 rounded-lg hover:bg-emerald-100 duration-200 cursor-pointer relative border-b border-b-gray-100"
              onClick={() => handleInvoiceClick(invoice)}
            >
              <p>{invoice.client_name}</p>
              <p>{new Date(invoice.date).toLocaleDateString()}</p>
              <p>{parseInt(invoice.total_amount)}€</p>
              <div className="relative flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(invoice.id);
                  }}
                  className="bg-gray-50 w-7 h-7 rounded-full"
                >
                  ⋮
                </button>
                {openMenuId === invoice.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 w-32 bg-white shadow flex flex-col rounded-lg p-2 z-10 text-sm text-gray-500"
                  >
                    <button
                      onClick={() => handleEdit(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownload(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleEmail(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200"
                    >
                      Send Email
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 text-red-500 hover:bg-red-100 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        {showModalDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white text-gray-600 p-10 rounded-xl relative shadow-xl max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
              <p className="text-lg md:text-2xl font-semibold text-center tracking-tighter text-red-600">
                Are you sure you want to delete this Invoice?
              </p>
              <p className="text-sm text-center max-w-sm text-gray-500 tracking-tight">
                All data associated with this invoice will be deleted and cannot
                be recovered.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 font-semibold text-white rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowModalDelete(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-300  duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-6 h-6 rounded-full ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white font-semibold"
                  : "bg-white text-emerald-500"
              } hover:bg-emerald-200 transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default InvoicesPage;
