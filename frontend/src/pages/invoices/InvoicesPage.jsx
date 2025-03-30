import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoicesByType } from "../../store/slices/invoicesSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

  const [invoiceType, setInvoiceType] = useState("income");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [openMenuId, setOpenMenuId] = useState(null);

  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (userId) {
      dispatch(fetchInvoicesByType({ userId, type: invoiceType }));
    }
  }, [dispatch, userId, invoiceType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [invoiceType, dateFilter]);

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
    console.log("Abrir fatura", invoice);
  };

  // const handleEdit = (invoice) => {
  //   console.log("Editar", invoice);
  // };

  // const handleDownload = (invoice) => {
  //   console.log("Download", invoice);
  // };

  // const handleEmail = (invoice) => {
  //   console.log("Enviar por email", invoice);
  // };

  // const handleDelete = (invoice) => {
  //   console.log("Deletar", invoice);
  // };

  return (
    <section className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-end space-x-2">
        {/* Income / Expense Toggle */}
        <div className="flex space-x-2">
          {["income", "expense"].map((type) => (
            <button
              key={type}
              onClick={() => setInvoiceType(type)}
              className={`px-6 py-2 rounded-lg ${
                invoiceType === type
                  ? "bg-emerald-200 font-semibold text-emerald-600"
                  : "bg-emerald-50 text-emerald-600"
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
              <button className="px-5 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition text-sm">
                + New Income
              </button>
            </Link>
            <Link to="/invoices/new-expense">
              <button className="px-5 py-2 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-red-200 hover:text-red-600 transition text-sm">
                + New Expense
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 px-4 py-2 text-start font-semibold cursor-pointer">
          <div className="flex items-center space-x-1">
            <p onClick={() => handleSort("client_name")}>Name</p>
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className={`w-4 h-4 ${
                sortField === "client_name" ? "rotate-180" : ""
              }`}
            />
          </div>
          <div className="flex items-center space-x-1">
            <p onClick={() => handleSort("date")}>Date</p>
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className={`w-4 h-4 ${sortField === "date" ? "rotate-180" : ""}`}
            />
          </div>
          <div className="flex items-center space-x-1">
            <p onClick={() => handleSort("amount")}>Amount</p>
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className={`w-4 h-4 ${
                sortField === "amount" ? "rotate-180" : ""
              }`}
            />
          </div>
          <div className="flex">
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
              className="grid grid-cols-4 items-center text-start px-4 py-2 hover:bg-emerald-100 transition"
              onClick={() => handleInvoiceClick(invoice)}
            >
              <p>{invoice.client_name}</p>
              <p>{new Date(invoice.date).toLocaleDateString()}</p>
              <p>{parseInt(invoice.total_amount)}€</p>
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(invoice.id);
                  }}
                  className="bg-gray-50 w-8 h-8 rounded-full"
                >
                  ⋮
                </button>
                {openMenuId === invoice.id && (
                  <div className="absolute right-0 bg-white shadow rounded p-2 z-10">
                    <button
                      onClick={() => handleEdit(invoice)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownload(invoice)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleEmail(invoice)}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                    >
                      Email
                    </button>
                    <button
                      onClick={() => handleDelete(invoice)}
                      className="block w-full text-left px-2 py-1 text-red-500 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white"
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
