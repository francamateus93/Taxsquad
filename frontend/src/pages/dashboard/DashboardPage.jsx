import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllInvoices } from "../../store/slices/invoicesSlice";
import IncomeChart from "./components/IncomeChart";
import ExpenseChart from "./components/ExpenseChart";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const invoices = useSelector((state) => state.invoices.invoices);

  useEffect(() => {
    if (!userId) return navigate("/login");
    // console.log("invoices:", invoices);
    dispatch(fetchAllInvoices({ userId }));
  }, [dispatch, userId]);

  const incomeTotal = invoices
    .filter((invoice) => invoice.invoice_type === "income")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const expenseTotal = invoices
    .filter((invoice) => invoice.invoice_type === "expense")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const balance = incomeTotal - expenseTotal;
  const latestInvoices = invoices.slice(0, 5).reverse();

  return (
    <section className="container mx-auto p-12 space-y-6">
      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-emerald-100 p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold">Total Income</h4>
          <p className="text-2xl font-bold text-emerald-600">
            {incomeTotal.toFixed(2)} €
          </p>
        </div>
        <div className="bg-red-100 p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold">Total Expenses</h4>
          <p className="text-2xl font-bold text-red-600">
            {expenseTotal.toFixed(2)} €
          </p>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl shadow">
          <h4 className="text-lg font-semibold">Balance</h4>
          <p className="text-2xl font-bold text-blue-600">
            {balance.toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <IncomeChart data={invoices} />
        <ExpenseChart data={invoices} />
      </div>

      {/* Invoices List */}
      <div className="mt-10 space-y-4">
        <h3 className="text-xl font-bold">Últimas Faturas</h3>
        {latestInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <p>{invoice.client_name}</p>
            <p>{new Date(invoice.date).toLocaleDateString()}</p>
            <p>
              € {invoice.total_amount} ({invoice.invoice_type})
            </p>
          </div>
        ))}
        <a
          href="/invoices"
          className="text-emerald-600 font-medium hover:underline"
        >
          Ver todas as faturas →
        </a>
      </div>

      <div className="mt-6">
        <a
          href="/documents"
          className="text-blue-600 font-medium hover:underline"
        >
          Ver documentos fiscais →
        </a>
      </div>
    </section>
  );
};

export default DashboardPage;
