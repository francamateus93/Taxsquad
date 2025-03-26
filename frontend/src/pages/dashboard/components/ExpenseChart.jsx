// src/pages/Dashboard/ExpenseChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ data }) => {
  const monthlyExpenses = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    total: data
      .filter((inv) => inv.invoice_type === "expense")
      .filter((inv) => new Date(inv.date).getMonth() === i)
      .reduce((sum, inv) => sum + inv.total_amount, 0),
  }));

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h4 className="text-lg font-semibold mb-4">Despesas por mês</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyExpenses}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
