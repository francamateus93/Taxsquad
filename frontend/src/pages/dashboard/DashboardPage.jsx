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
    dispatch(fetchAllInvoices({ userId }));
  }, [dispatch, userId]);

  const incomeTotal = invoices
    .filter((invoice) => invoice.invoice_type === "income")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const expenseTotal = invoices
    .filter((invoice) => invoice.invoice_type === "expense")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const balance = incomeTotal - expenseTotal;
  const latestInvoices = invoices.slice(0, 6);

  return (
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
      {/* Cards */}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-6 rounded-xl hover:scale-105 transition duration-300 text-start">
          <h4 className="text-lg font-semibold tracking-tighter mb-2">
            Total Income
          </h4>
          <div>
            <p className="text-4xl font-bold text-emerald-600 tracking-tighter">
              {incomeTotal.toFixed(2)}€
            </p>
            <p></p>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl hover:scale-105 transition duration-300 text-start">
          <h4 className="text-lg font-semibold tracking-tighter mb-2">
            Total Expenses
          </h4>
          <p className="text-4xl font-bold tracking-tighter text-red-400">
            {expenseTotal.toFixed(2)} €
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl hover:scale-105 transition duration-300 text-start">
          <h4 className="text-lg font-semibold tracking-tighter mb-2">
            Balance
          </h4>
          <p className="text-4xl font-bold tracking-tighter text-sky-600">
            {balance.toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-col gap-8 bg-gray-100 rounded-2xl p-5 md:p-8 my-8">
        <IncomeChart data={invoices} />
        <ExpenseChart data={invoices} />
      </div>

      {/* Invoices List */}
      <div className="bg-gray-100 h-fit rounded-2xl p-4 overflow-y-auto">
        <h3 className="text-2xl font-bold mt-4 tracking-tight">
          Lasts Invoices
        </h3>
        <div className="my-8 space-y-4">
          {loading && <LoadingSpinner />}
          {error && <Error message={error} />}

          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className={`flex flex-wrap md:flex-nowrap justify-between gap-6 max-w-7xl text-xs md:text-base text-start bg-white p-4 rounded-lg cursor-pointer ${
                invoice.invoice_type === "income"
                  ? "hover:bg-emerald-100"
                  : "hover:bg-red-100"
              } transition duration-300"`}
            >
              <div className="flex flex-col">
                <p
                  className={`font-bold text-xl tracking-tighter ${
                    invoice.invoice_type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {invoice.invoice_type.charAt(0).toUpperCase() +
                    invoice.invoice_type.slice(1)}{" "}
                </p>
                <p className="text-gray-400 tracking-tight">
                  {invoice.client_name}
                </p>
              </div>
              <p>{invoice.total_amount} €</p>
            </div>
          ))}
        </div>
        <Link
          to={"/invoices"}
          className="text-emerald-600 font-medium hover:underline hover:text-emerald-400 transition duration-200 mb-2"
        >
          Ver todas as faturas →
        </Link>
      </div>

      <div className="bg-gray-100 h-fit rounded-2xl p-4 overflow-y-auto mt-4">
        <Link
          to={"/documents"}
          className="text-sky-600 font-medium hover:underline"
        >
          Ver documentos fiscais →
        </Link>
      </div>
    </section>
  );
};

export default DashboardPage;
