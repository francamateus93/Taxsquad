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
      categories,
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
      offsetY: -35,
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
    <div className="bg-white rounded-xl w-full p-4 shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <h4 className="hidden md:block text-start text-2xl font-bold tracking-tighter px-4 md:py-2 py-8">
          Money Flow
        </h4>
        <p className="text-gray-400 px-6 text-end tracking-tighter cursor-pointer">
          Annual
        </p>
      </div>
      <Chart options={options} series={series} type="bar" height={325} />
    </div>
  );
};

export default BarChart;
