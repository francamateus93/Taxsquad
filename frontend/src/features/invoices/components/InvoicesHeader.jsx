import { Link } from "react-router-dom";

const InvoicesHeader = ({
  invoiceType,
  setInvoiceType,
  dateFilter,
  setDateFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-end space-x-2">
      {/* Income / Expense Toggle */}
      <div className="flex space-x-2 mb-4 md:mb-0">
        {["income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setInvoiceType(type)}
            className={`px-6 py-2 rounded-xl cursor-pointer tracking-tighter text-center ${
              invoiceType === type
                ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600"
                : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200"
            } transition duration-200`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 space-x-2 items-end">
        {/* Date Filter */}
        <div className="flex items-center space-x-1 text-gray-500">
          <label className="font-semibold text-sm">Filter:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-none text-sm"
          />
        </div>

        {/* Buttons New Invoices */}
        <div className="flex items-center space-x-2">
          <Link to="/invoices/new-income">
            <button className="px-3 md:px-5 py-2 text-sm md:text-base font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition cursor-pointer">
              + New Income
            </button>
          </Link>
          <Link to="/invoices/new-expense">
            <button className="px-3 md:px-5 py-2 text-sm md:text-base font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:text-red-400 transition duration-200 cursor-pointer">
              + New Expense
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvoicesHeader;
