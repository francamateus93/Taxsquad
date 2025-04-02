import { useDashboard } from "./hook/useDashboard";
import BarChart from "./components/BarChart";
import DashboardCard from "./components/DashboardCard";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";
import RecentActivities from "./components/RecentActivities";

const DashboardPage = () => {
  const {
    incomeTotal,
    expenseTotal,
    balance,
    recentActivities,
    invoices,
    loading,
    error,
  } = useDashboard();

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

      <RecentActivities invoices={recentActivities} />
    </section>
  );
};

export default DashboardPage;
