import { useDashboard } from "../features/dashboard/hook/useDashboard.js";
import BarChart from "../features/dashboard/components/BarChart.jsx";
import DashboardCard from "../features/dashboard/components/DashboardCard.jsx";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import Error from "../components/ui/Error";
import RecentActivities from "../features/dashboard/components/RecentActivities.jsx";

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
