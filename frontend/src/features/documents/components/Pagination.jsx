const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="flex justify-center mt-6 space-x-1">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
    >
      ←
    </button>
    <span className="text-sm px-4 py-2 text-gray-500">
      {currentPage} de {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
    >
      →
    </button>
  </div>
);

export default Pagination;
