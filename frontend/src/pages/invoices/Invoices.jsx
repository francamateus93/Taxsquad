import React, { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInvoices, setLoading, setError } from "../../store/invoicesSlice";
import { Link } from "react-router-dom";
import api from "../../services/data/Api";

const Invoices = () => {
  const dispatch = useDispatch();
  const { invoices, loading, error } = useSelector((state) => state.invoices);
  const [invoiceType, setInvoiceType] = useState("income");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  useEffect(() => {
    const fetchInvoices = async () => {
      dispatch(setLoading(true));
      try {
        const { data } = await api.get(`/invoices/${invoiceType}`);
        dispatch(setInvoices(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchInvoices();
  }, [dispatch, invoiceType]);

  // Filter
  const filteredInvoices = invoices
    .filter((inv) => inv.type === invoiceType)
    .filter((inv) => {
      if (!dateFilter) return true;
      return inv.date >= dateFilter;
    });

  // Pagination
  const paginatedInvoices = useSelector((state) =>
    state.invoices.invoices.slice(0, currentPage * pageSize)
  );

  const canLoadMore = paginatedInvoices.length < invoices.length;
  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleInvoiceClick = (invoice) => {
    console.log("Clicked invoice", invoice);
    // Exibir modal de opções: Edit, Duplicate, Download, Delete...
    // ou navegar para uma tela de detalhes.
  };

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Invoices</h1>

      {/* Botões Income / Expenses */}
      <div className="space-x-2">
        <button
          onClick={() => {
            setInvoiceType("income");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded ${
            invoiceType === "income"
              ? "bg-emerald-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => {
            setInvoiceType("expense");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded ${
            invoiceType === "expense"
              ? "bg-emerald-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Filtro de Data */}
      <div className="flex items-center space-x-2">
        <label htmlFor="dateFilter" className="font-semibold">
          Filter
        </label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-1"
        />
      </div>

      {/* Botão para criar nova fatura */}
      <div className="flex space-x-2 justify-center">
        <div>
          <Link to="/invoices/new-income">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded">
              New Income
            </button>
          </Link>
        </div>

        <div>
          <Link to="/invoices/new-expense">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded">
              New Expense
            </button>
          </Link>
        </div>
      </div>

      {/* List */}
      {loading && <p>Loading invoices...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && paginatedInvoices.length > 0 && (
        <div className="space-y-2">
          <h2>Invoices</h2>
          {paginatedInvoices.map((invoice) => (
            <div
              key={invoice.id}
              onClick={() => handleInvoiceClick(invoice)} // ADJUST HANDLE CLICK TO UPDATE
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

      {/* Paginação */}
      {canLoadMore && (
        <button
          onClick={handleLoadMore}
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
        >
          Load More
        </button>
      )}
    </section>
  );
};

export default Invoices;
