import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllInvoices } from "../../store/slices/invoicesSlice";
import IncomeChart from "./components/IncomeChart";
import ExpenseChart from "./components/ExpenseChart";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

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
      <div className="bg-emerald-50 h-fit rounded-2xl p-4 overflow-y-auto">
        <h3 className="text-2xl font-bold mt-4">Últimas Faturas</h3>
        <div className="my-8 space-y-3">
          {loading && <LoadingSpinner />}
          {error && <Error message={error} />}

          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex flex-wrap md:flex-nowrap justify-between gap-4 max-w-7xl text-xs md:text-base text-start bg-white p-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
            >
              <div>
                <p className="font-semibold">
                  {invoice.invoice_type.charAt(0).toUpperCase() +
                    invoice.invoice_type.slice(1)}{" "}
                  : <p className="font-normal">{invoice.client_name}</p>
                </p>
              </div>
              {/* <p>{new Date(invoice.date).toLocaleDateString()}</p> */}
              {/* <p>{invoice.invoice_type}</p> */}
              <p>{invoice.total_amount} €</p>
            </div>
          ))}
        </div>
        <Link
          to={"/invoices"}
          className="text-emerald-600 font-medium hover:underline hover:text-emerald-400 transition duration-200"
        >
          Ver todas as faturas →
        </Link>
      </div>

      <div className="mt-6">
        <Link
          to={"/documents"}
          className="text-blue-600 font-medium hover:underline"
        >
          Ver documentos fiscais →
        </Link>
      </div>
    </section>
  );
};

export default DashboardPage;
