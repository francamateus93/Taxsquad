import Chart from "react-apexcharts";
import { useEffect, useState } from "react";

const BarChart = ({ invoices }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [viewMode, setViewMode] = useState("yearly");

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

  const quarterlyFull = ["Q1", "Q2", "Q3", "Q4"];

  const getMonthlyData = () => {
    return monthsFull.map((month, index) => {
      const income = invoices
        .filter(
          (inv) =>
            inv.invoice_type === "income" &&
            new Date(inv.date).getMonth() === index
        )
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

      const expense = invoices
        .filter(
          (inv) =>
            inv.invoice_type === "expense" &&
            new Date(inv.date).getMonth() === index
        )
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

      return { income, expense };
    });
  };

  const getQuarterlyData = () => {
    const quarters = [0, 3, 6, 9];
    return quarters.map((start, i) => {
      const end = start + 3;
      const income = invoices
        .filter((inv) => inv.invoice_type === "income")
        .filter((inv) => {
          const month = new Date(inv.date).getMonth();
          return month >= start && month < end;
        })
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

      const expense = invoices
        .filter((inv) => inv.invoice_type === "expense")
        .filter((inv) => {
          const month = new Date(inv.date).getMonth();
          return month >= start && month < end;
        })
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0);

      return { income, expense, label: `Q${i + 1}` };
    });
  };

  const data = viewMode === "monthly" ? getMonthlyData() : getQuarterlyData();

  const series = [
    { name: "Income", data: data.map((d) => d.income) },
    { name: "Expenses", data: data.map((d) => d.expense) },
  ];

  const categories =
    viewMode === "monthly" ? monthsFull : data.map((d) => d.label);

  const options = {
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
      stacked: true,
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
      categories: viewMode === "monthly" ? monthsFull : quarterlyFull,
      labels: {
        style: {
          colors: "#9ca3af",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val)}€`,
        style: {
          colors: "#9ca3af",
        },
      },
    },

    legend: {
      position: "top",
      fontSize: "14px",
      horizontalAlign: "center",
      offsetY: isMobile ? 5 : -35,
      markers: {
        radius: 50,
      },
      labels: {
        colors: "#9ca3af",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${Math.round(val)} €`,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "70%",
            },
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl w-full md:p-4 px-2 py-4 shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between px-2 mt-4">
        <h4 className="text-2xl px-2 font-bold tracking-tight">Money Flow</h4>
        <div className="flex justify-end gap-2">
          <button
            onClick={() =>
              setViewMode(viewMode === "monthly" ? "quarterly" : "monthly")
            }
            className="cursor-pointer text-sm flex items-center gap-1 text-gray-400 md:px-4 md:py-2 px-2 hover:font-medium transition duration-200"
          >
            {viewMode === "monthly" ? "Quarterly" : "Monthly"}
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className="w-4 h-4 opacity-40 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Scroll wrapper for mobile */}
      <div className="mt-6 md:my-0">
        <Chart
          options={options}
          series={series}
          type="bar"
          height={325}
          className="pr-2 md:pr-0"
        />
      </div>
    </div>
  );
};

export default BarChart;
