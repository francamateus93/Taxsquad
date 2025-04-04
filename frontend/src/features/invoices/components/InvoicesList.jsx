import React from "react";

const InvoiceList = ({
  paginatedInvoices = [],
  loading,
  error,
  handleInvoiceClick,
  toggleMenu,
  openMenuId,
  menuRef,
  handleEdit,
  handleDownload,
  handleEmail,
  handleConfirmDelete,
}) => {
  return (
    <>
      {/* Invoices List */}
      <div className="bg-white p-3 md:p-4 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300">
        <div className="grid grid-cols-12 bg-emerald-50 md:px-4 p-2 text-start font-bold rounded-t-xl">
          <div className="col-span-4 flex items-center space-x-1">
            <div
              className="flex items-center md:space-x-1 cursor-pointer"
              onClick={() => handleSort("client_name")}
            >
              <p className="text-start text-sm md:text-base">Name</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-3 h-3"
              />
            </div>
          </div>
          <div className="col-span-3 flex items-center space-x-1">
            <div
              className="flex items-center md:space-x-1 cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <p className="text-start text-sm md:text-base">Date</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-3 h-3"
              />
            </div>
          </div>
          <div className="col-span-3 flex items-center space-x-1">
            <div
              className="flex items-center md:space-x-1 cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <p className="text-start text-sm md:text-base">Amount</p>
              <img
                src="https://img.icons8.com/?size=24&id=85502&format=png"
                alt="arrow down"
                className="w-3 h-3"
              />
            </div>
          </div>
          <div className="col-span-2 justify-self-end">
            <p className="text-start text-sm md:text-base">Actions</p>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <Error message={error} />}

        {!loading && !error && paginatedInvoices.length === 0 && (
          <p className="text-center text-gray-500 p-4">No invoices found</p>
        )}

        {!loading &&
          !error &&
          paginatedInvoices.map((invoice) => (
            <div
              key={invoice.number}
              className="grid grid-cols-12 items-center text-start p-2 md:px-4 md:py-3 rounded-lg hover:bg-emerald-100 duration-200 cursor-pointer relative border-b border-b-gray-100"
              onClick={() => handleInvoiceClick(invoice)}
            >
              <p className="col-span-4 font-semibold text-sm md:text-base">
                {invoice.client_name}
              </p>
              <p className="col-span-3 text-xs md:text-base">
                {new Date(invoice.date).toLocaleDateString()}
              </p>
              <p className="col-span-2 text-right md:text-start text-xs md:text-base">
                {parseInt(invoice.total_amount)}€
              </p>
              <div className="col-span-3 relative flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(invoice.id);
                  }}
                  className="bg-gray-50 w-7 h-7 rounded-full cursor-pointer"
                >
                  ⋮
                </button>
                {openMenuId === invoice.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 w-32 bg-white shadow flex flex-col rounded-lg p-2 z-10 text-sm text-gray-500"
                  >
                    <button
                      onClick={() => handleEdit(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownload(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200 cursor-pointer"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleEmail(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200 cursor-pointer"
                    >
                      Send Email
                    </button>
                    <button
                      onClick={() => handleConfirmDelete(invoice)}
                      className="block w-full rounded-md text-left px-2 py-2 text-red-500 hover:bg-red-100 transition duration-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default InvoiceList;
