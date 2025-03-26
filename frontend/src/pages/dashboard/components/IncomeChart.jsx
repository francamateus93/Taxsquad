import Chart from "react-apexcharts";
import { generateChartData } from "../../../components/utils/chartData.js";

const IncomeChart = ({ data }) => {
  const chartData = generateChartData(data, "income");
  const categories = chartData.map((item) => item.month);

  const monthlyIncomes = Array(12).fill(0);
  data
    .filter((inv) => inv.invoice_type === "income")
    .forEach((inv) => {
      const month = new Date(inv.date).getMonth();
      monthlyIncomes[month] += Number(inv.total_amount) || 0;
    });

  const options = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        tools: {
          show: true,
          download: true,
          offsetX: 20,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: "end",
        columnWidth: "60%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${Math.round(val)} €`,
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    fill: {
      colors: ["#34d399"],
    },
  };

  const series = [
    {
      name: "Income",
      data: monthlyIncomes.map((amount) =>
        parseFloat((Number(amount) || 0).toFixed(2))
      ),
      // data: seriesData,
    },
  ];

  return (
    <div className="bg-white p-4 rounded-xl w-full">
      <h4 className="text-start text-2xl font-bold tracking-tight p-4">
        Monthly Income
      </h4>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default IncomeChart;
