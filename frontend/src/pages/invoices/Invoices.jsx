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

  useEffect(() => {
    dispatch(fetchInvoicesByType({ userId, type: invoiceType }));
  }, [dispatch, userId, invoiceType]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error />;
  const filteredInvoices = invoices.filter((invoice) => {
    if (!dateFilter) return true;
    return invoice.date >= dateFilter;
  });

  const handleInvoiceClick = (invoice) => {
    console.log("Invoice clicked:", invoice);
    // implement the logic to handle the invoice click
  };

  return (
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
      {/* Buttons: Income / Expenses */}
      <div className="flex justify-start space-x-2 mb-10">
        <button
          onClick={() => setInvoiceType("income")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            invoiceType === "income"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setInvoiceType("expense")}
          className={`px-4 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            invoiceType === "expense"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-1 text-gray-500">
        <label htmlFor="dateFilter" className="font-semibold text-sm">
          Filter:
        </label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
          }}
          className="border-none text-sm"
        />
      </div>

      {/* Buttons New Income / New Expense */}
      <div className="flex space-x-2 justify-end">
        <div>
          <button className="px-4 py-2 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-500 transition duration-200 text-sm">
            <Link to="/invoices/new-income">+ New Income</Link>
          </button>
        </div>

        <div>
          <button className="px-4 py-2 text-emerald-600 font-semibold bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition duration-200 text-sm">
            <Link to="/invoices/new-expense">+ New Expense</Link>
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-2 bg-emerald-50 h-[600px] rounded-2xl p-4">
        {loading && <LoadingSpinner />}
        {error && <Error message={error} />}

        {!loading && !error && filteredInvoices.length === 0 && (
          <p className="text-gray-600">No invoices found.</p>
        )}

        {!loading &&
          !error &&
          filteredInvoices.map((invoice) => (
            <div
              key={invoice.number}
              onClick={() => handleInvoiceClick(invoice)}
              className="flex flex-wrap md:flex-nowrap justify-between gap-4 max-w-7xl text-xs md:text-base text-start bg-white p-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
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
    </section>
  );
};

export default Invoices;
