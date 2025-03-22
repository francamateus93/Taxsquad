import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvoicesByType } from "../../store/slices/invoicesSlice";
import { Link } from "react-router-dom";
// import api from "../../services/data/Api";

const Invoices = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);
  const [type, setType] = useState("income");

  // useEffect(() => {
  //   const fetchInvoices = async () => {
  //     dispatch(setLoading(true));
  //     try {
  //       const { data } = await api.get(`/invoices/${invoiceType}`);
  //       dispatch(setInvoices(data));
  //     } catch (err) {
  //       dispatch(setError(err.message));
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };
  //   fetchInvoices();
  // }, [dispatch, invoiceType]);

  // Filter
  const filteredInvoices = invoices
    .filter((inv) => inv.type === invoiceType)
    .filter((inv) => {
      if (!dateFilter) return true;
      return inv.date >= dateFilter;
    });

  // // Pagination
  // const paginatedInvoices = useSelector((state) =>
  //   state.invoices.invoices.slice(0, currentPage * pageSize)
  // );

  // const canLoadMore = paginatedInvoices.length < invoices.length;
  // const handleLoadMore = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };

  // const handleInvoiceClick = (invoice) => {
  //   console.log("Clicked invoice", invoice);
  //   // Exibir modal de opções: Edit, Duplicate, Download, Delete...
  //   // ou navegar para uma tela de detalhes.
  // };

  useEffect(() => {
    dispatch(fetchInvoicesByType({ type, userId }));
  }, [dispatch, type, userId]);

  return (
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
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
            setCurrentPage(1);
          }}
          className="border-none p-1 text-sm"
        />
      </div>

      {/* Buttons Income / Expenses */}
      <div className="flex justify-start space-x-2 mb-10">
        <button
          onClick={() => setType("income")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            invoiceType === "income"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            invoiceType === "expense"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Buttons New Income / New Expense */}
      <div className="flex space-x-2 justify-end">
        <div>
          <Link to="/invoices/new-income">
            <button className="px-4 py-2 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-500 transition duration-200 text-sm">
              + New Income
            </button>
          </Link>
        </div>

        <div>
          <Link to="/invoices/new-expense">
            <button className="px-4 py-2 text-emerald-600 font-semibold bg-emerald-50 rounded-lg hover:bg-emerald-600 hover:text-white transition duration-200 text-sm">
              + New Expense
            </button>
          </Link>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 bg-emerald-50 h-[600px] rounded-2xl">
        {loading && <p>Loading invoices...</p>}
        {error && <p className="py-4 font-medium">{error}</p>}

        {!loading && !error && paginatedInvoices.length > 0 && (
          <div className="space-y-2 bg-gray-200">
            <h2>Invoices</h2>
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                onClick={() => handleInvoiceClick(invoice)}
                className="bg-white p-4 rounded cursor-pointer hover:bg-gray-100"
              >
                <p className="font-semibold">Invoice #{invoice.number}</p>
                <p>{invoice.clientName}</p>
                <p>{invoice.date}</p>
                <p>
                  Total: {invoice.total} {invoice.currency}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Paginação */}
      {/* {canLoadMore && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Load More
        </button>
      )} */}
    </section>
  );
};

export default Invoices;
