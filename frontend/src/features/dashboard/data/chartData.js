const MONTHS = [
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

export function generateChartData(invoices, type) {
  const dataMap = new Map();

  MONTHS.forEach((month) => {
    dataMap.set(month, 0);
  });

  invoices
    .filter((invoice) => invoice.invoice_type === type)
    .forEach((invoice) => {
      const date = new Date(invoice.date);
      const month = MONTHS[date.getMonth()];
      const prevTotal = Number(dataMap.get(month) || 0);
      dataMap.set(month, prevTotal + invoice.total_amount);
    });

  return MONTHS.map((month) => {
    const value = Number(dataMap.get(month) || 0);
    return {
      month,
      total: parseFloat(value.toFixed(2)),
    };
  });
}
