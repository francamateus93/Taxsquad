import React from "react";

const InvoicePagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`w-6 h-6 rounded-full ${
            currentPage === i + 1
              ? "bg-emerald-500 text-white font-semibold"
              : "bg-white text-emerald-500"
          } hover:bg-emerald-200 transition`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default InvoicePagination;
