import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoicesByType } from "../../store/slices/invoicesSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const Invoices = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

  const [invoiceType, setInvoiceType] = useState("income");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (userId) {
      dispatch(fetchInvoicesByType({ userId, type: invoiceType }));
    }
  }, [dispatch, userId, invoiceType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [invoiceType, dateFilter]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;

  const filteredInvoices = invoices.filter((invoice) => {
    if (!dateFilter) return true;
    return invoice.date >= dateFilter;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentInvoices = filteredInvoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleInvoiceClick = (invoice) => {
    console.log("Invoice clicked:", invoice);
    // implement the logic to handle the invoice click
  };

  return (
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
      {/* Botões Income / Expenses */}
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

      {/* Filtro de data */}
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

      {/* Botões de nova fatura */}
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

      {/* Lista de faturas */}
      <div className="space-y-2 bg-emerald-50 rounded-2xl p-4">
        <div className="flex justify-between px-4 tracking-tight font-semibold">
          <p>Id Client</p>
          <p>Name</p>
          <p>Date</p>
          <p>Total</p>
        </div>

        {loading && <LoadingSpinner />}
        {error && <Error message={error} />}

        {!loading && !error && currentInvoices.length === 0 && (
          <p className="text-center text-gray-500 p-4">No invoices found</p>
        )}

        {!loading &&
          !error &&
          currentInvoices.map((invoice) => (
            <div
              key={invoice.number}
              onClick={() => handleInvoiceClick(invoice)}
              className="flex flex-wrap md:flex-nowrap justify-between gap-4 text-xs md:text-sm bg-white p-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
            >
              <h4 className="font-semibold w-30">{invoice.number}</h4>
              <p className="w-66">{invoice.client_name}</p>
              <p className="w-26">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
              <p className="w-46 text-end">
                {invoice.total_amount} {invoice.currency}
              </p>
            </div>
          ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-200 transition duration-200 disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-sm px-4 py-2 text-gray-500">
            {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default Invoices;
