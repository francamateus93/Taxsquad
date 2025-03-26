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

  useEffect(() => {
    if (userId) {
      dispatch(fetchInvoicesByType({ userId, type: invoiceType }));
    }
  }, [dispatch, userId, invoiceType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [invoiceType, dateFilter]);

  const filteredInvoices = invoices
    .filter((invoice) => {
      if (!dateFilter) return true;
      return invoice.date >= dateFilter;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (invoice) => {
    console.log("Editar", invoice);
  };

  const handleDownload = (invoice) => {
    console.log("Download", invoice);
  };

  const handleEmail = (invoice) => {
    console.log("Enviar por email", invoice);
  };

  const handleDelete = (invoice) => {
    console.log("Deletar", invoice);
  };

  return (
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
      {/* Income / Expense Toggle */}
      <div className="flex justify-start space-x-2 mb-10">
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

      {/* Date Filter */}
      <div className="flex items-center space-x-1 text-gray-500">
        <label htmlFor="dateFilter" className="font-semibold text-sm">
          Filter:
        </label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border-none text-sm"
        />
      </div>

      {/* Buttons New Invoices */}
      <div className="flex space-x-2 justify-end">
        <Link to="/invoices/new-income">
          <button className="px-4 py-2 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-500 transition text-sm">
            + New Income
          </button>
        </Link>
        <Link to="/invoices/new-expense">
          <button className="px-4 py-2 text-emerald-600 font-semibold bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition text-sm">
            + New Expense
          </button>
        </Link>
      </div>

      {/* Invoices List */}
      <div className="space-y-2 bg-gray-100 rounded-2xl p-4">
        <div className="flex items-center justify-between px-4 py-1">
          <p className="font-semibold">Invoices</p>
          <p className="text-sm">
            {paginatedInvoices.length} of {filteredInvoices.length} Invoices
          </p>
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
              onClick={() => handleInvoiceClick(invoice)}
              className="grid grid-cols-1 text-start md:flex justify-between items-center md:gap-4 text-base bg-white px-4 py-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
            >
              <h4 className="font-semibold md:w-30">{invoice.number}</h4>
              <p className="md:w-66">{invoice.client_name}</p>
              <p className="md:w-26">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-end gap-4 md:w-46">
                <p className="text-end font-semibold">
                  {parseInt(invoice.total_amount)}€
                </p>
                <button
                  onClick={() => toggleMenu(invoice.id)}
                  className="bg-gray-50 w-8 h-8 rounded-full transition duration-200 text-lg cursor-pointer"
                >
                  ⋮
                </button>
              </div>

              {openMenuId === invoice.id && (
                <div className="absolute right-4 top-48 z-10 bg-white shadow-md rounded-lg text-sm w-48">
                  <button
                    onClick={() => handleEdit(invoice)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50"
                  >
                    Edit Invoice
                  </button>
                  <button
                    onClick={() => handleDownload(invoice)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleEmail(invoice)}
                    className="w-full text-left px-4 py-2 hover:bg-emerald-50"
                  >
                    Send by Email
                  </button>
                  <button
                    onClick={() => handleDelete(invoice)}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full ${
                currentPage === i + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-emerald-500"
              } hover:bg-emerald-200 transition duration-200`}
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
