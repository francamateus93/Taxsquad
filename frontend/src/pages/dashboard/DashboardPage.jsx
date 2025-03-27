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
  const recentActivities = invoices.slice(0, 5);

  return (
    <section className="container mx-auto p-6 space-y-6 grid col-span-1 lg:grid-cols-8 gap-4">
      {/* Column 1 - Cards and Graph */}
      <div className="col-span-6 space-y-6">
        {/* <h2 className="text-3xl font-bold tracking-tighter text-start mb-7 mt-2">
          Hello, this is your Dashboard.
        </h2> */}
        <div className="grid lg:grid-cols-3 gap-4 ">
          <div className="bg-white p-6 shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-xl hover:scale-103 transition duration-300 text-start">
            <h4 className="text-2xl font-bold tracking-tighter mb-4">
              Total Income
            </h4>
            <div>
              <p className="text-4xl font-bold text-emerald-400 -tracking-widest">
                {incomeTotal.toLocaleString("es-ES", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                €
              </p>
              <p></p>
            </div>
          </div>
          <div className="bg-white p-6 shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-xl hover:scale-103 transition duration-300 text-start">
            <h4 className="text-2xl font-bold tracking-tighter mb-4">
              Total Expenses
            </h4>
            <p className="text-4xl font-bold text-red-400 -tracking-widest">
              {expenseTotal.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>
          <div className="bg-white p-6 shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-xl hover:scale-103 transition duration-300 text-start">
            <h4 className="text-2xl font-bold tracking-tighter mb-4">
              Balance
            </h4>
            <p className="text-4xl font-bold -tracking-widest">
              {balance.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </p>
          </div>
        </div>
        {/* Graph */}
        <div className="p-1">
          <IncomeChart data={invoices} />
        </div>
      </div>

      {/* Invoices List */}
      <div className="col-span-5 lg:col-span-2">
        <div className="bg-white shadow-[0_0px_5px_rgba(0,0,0,0.1)] h-fit rounded-2xl p-4 overflow-y-auto">
          <div className="flex flex-col text-start tracking-tighter px-3 py-4">
            <h3 className="text-2xl font-bold">Recent Activities</h3>
            <p className="text-gray-400 text-sm">Your recent invoices</p>
          </div>
          <div className="py-4 space-y-2">
            {loading && <LoadingSpinner />}
            {error && <Error message={error} />}

            {recentActivities.map((invoice) => (
              <div
                key={invoice.id}
                className={`flex flex-wrap md:flex-nowrap justify-between gap-6 max-w-7xl text-xs md:text-base text-start bg-white p-3
                  2 rounded-lg cursor-pointer ${
                    invoice.invoice_type === "income"
                      ? "hover:bg-emerald-100"
                      : "hover:bg-red-100"
                  } transition duration-300"`}
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-lg tracking-tighter">
                    {invoice.client_name}
                  </p>
                  <p
                    className="text-gray-400 text-sm font-medium tracking-tighter"
                    // className={`tracking-tighter text-sm ${
                    //   invoice.invoice_type === "income"
                    //     ? "text-emerald-600"
                    //     : "text-red-600"
                    // }`}
                  >
                    {invoice.invoice_type.charAt(0).toUpperCase() +
                      invoice.invoice_type.slice(1)}{" "}
                  </p>
                </div>
                <p className="font-semibold text-lg">
                  {parseInt(invoice.total_amount)}€
                </p>
              </div>
            ))}
          </div>
          <Link
            to={"/invoices"}
            className="text-emerald-600 font-medium hover:underline hover:text-emerald-400 transition duration-200 mb-2"
          >
            See all invoices →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
