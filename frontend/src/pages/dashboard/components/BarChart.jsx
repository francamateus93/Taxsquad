import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const BarChart = ({ invoices }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const monthsFull = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthsMobile = ["Jan", "Feb", "Mar", "Apr", "May"];

  const categories = isMobile ? monthsMobile : monthsFull;

  const calculateMonthlyTotal = (type) => {
    const totals = categories.map((month) => {
      const monthIndex = monthsFull.indexOf(month);
      return invoices
        .filter((inv) => {
          const date = new Date(inv.date);
          return inv.invoice_type === type && date.getMonth() === monthIndex;
        })
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);
    });
    return totals;
  };

  const series = [
    {
      name: "Income",
      data: calculateMonthlyTotal("income"),
    },
    {
      name: "Expenses",
      data: calculateMonthlyTotal("expense"),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: { show: false },
    },
    colors: ["#34d399", "#f87171"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: isMobile ? "70%" : "60%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val)}€`,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "left",
    },
    tooltip: {
      y: {
        formatter: (val) => `${Math.round(val)} €`,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl w-full p-4 shadow-[0_0px_5px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between">
        <h4 className="text-start text-2xl font-bold tracking-tighter px-4 py-2">
          Money Flow
        </h4>
        <p className="text-gray-400 px-6 text-end tracking-tighter">Annual</p>
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
