import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllInvoices } from "../../store/slices/invoicesSlice";
import BarChart from "./components/BarChart";
import DashboardCard from "./components/DashboardCard";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (!userId) navigate("/login");
    dispatch(fetchAllInvoices({ userId }));
  }, [dispatch, userId, navigate]);

  const incomeTotal = invoices
    .filter((invoice) => invoice.invoice_type === "income")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const expenseTotal = invoices
    .filter((invoice) => invoice.invoice_type === "expense")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const balance = incomeTotal - expenseTotal;
  const recentActivities = invoices.slice(0, 5);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error message={error} />;

  return (
    <section className="container mx-auto p-6 grid col-span-1 lg:grid-cols-8 gap-4">
      <div className="col-span-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-4">
          <DashboardCard
            title="Total Income"
            amount={incomeTotal}
            className="text-emerald-400"
          />
          <DashboardCard
            title="Total Expenses"
            amount={expenseTotal}
            className="text-red-400"
          />
          <DashboardCard title="Balance" amount={balance} />
        </div>{" "}
        <div>
          <BarChart invoices={invoices} />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="col-span-6 md:col-span-2 flex flex-col justify-between gap-2 bg-white shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 py-8 overflow-y-auto hover:shadow-xl transition duration-300">
        <h3 className="text-2xl font-bold mb-2">Recent Activities</h3>
        <div className="py-2 space-y-1 ">
          {recentActivities.map((invoice) => (
            <div
              key={invoice.id}
              className={`flex justify-between gap-6 text-base p-3 rounded-lg cursor-pointer ${
                invoice.invoice_type === "income"
                  ? "hover:bg-emerald-100"
                  : "hover:bg-red-100"
              } transition duration-300`}
            >
              <div className="flex flex-col gap-1 text-start leading-5">
                <p className="font-semibold">{invoice.client_name}</p>
                <p className="text-sm text-gray-400 capitalize">
                  {invoice.invoice_type}
                </p>
              </div>
              <p
                className={`font-semibold text-sm ${
                  invoice.invoice_type === "income"
                    ? "hover:text-emerald-500"
                    : "hover:text-red-500"
                }`}
              >
                {invoice.invoice_type === "income" ? "+" : "-"}
                {parseInt(invoice.total_amount)}€
              </p>
            </div>
          ))}
        </div>
        <Link
          to={"/invoices"}
          className=" bg-white shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 text-emerald-600 font-medium hover:shadow-xl transition duration-300"
        >
          See all invoices →
        </Link>
      </div>
    </section>
  );
};

export default DashboardPage;
