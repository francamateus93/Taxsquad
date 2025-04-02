import { Link } from "react-router-dom";

const RecentActivities = ({ invoices }) => {
  return (
    <div className="col-span-6 md:col-span-2 flex flex-col justify-between gap-2 bg-white shadow-[0_0px_5px_rgba(0,0,0,0.1)] rounded-2xl p-4 py-8 overflow-y-auto hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-bold mb-2">Recent Activities</h3>
      <div className="py-2 space-y-1 ">
        {invoices.map((invoice) => (
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
  );
};

export default RecentActivities;
