import { useDocuments } from "../features/documents/hooks/useDocuments.js";
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx";
import Error from "../components/ui/Error.jsx";

const DocumentsPages = () => {
  const {
    documentType,
    setDocumentType,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    openMenuId,
    menuRef,
    loading,
    error,
    filteredDocuments,
    totalPages,
    currentDocuments,
    toggleMenu,
    handleDownload,
    handleEmail,
    handleConfirmDelete,
    handleDelete,
    showModalDelete,
    setShowModalDelete,
  } = useDocuments();

  return (
    <section className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end space-x-2">
        {/* Quarterly/Annual Toggle */}
        <div className="flex space-x-2 mb-4 md:mb-0">
          {["quarterly", "annual"].map((type) => (
            <button
              key={type}
              onClick={() => setDocumentType(type)}
              className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
                documentType === type
                  ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600"
                  : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200"
              } transition duration-200`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex justify-end space-x-1 px-4 text-gray-500">
          <label htmlFor="dateFilter" className="font-semibold text-sm">
            Filter:
          </label>
          <input
            id="dateFilter"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border-none text-sm"
          />
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300 relative">
        <div className="grid grid-cols-2 bg-emerald-50 rounded-t-xl px-4 py-2 tracking-tight font-semibold">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            // onClick={handleSort()}
          >
            <p className="font-bold">Document</p>
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-end justify-end cursor-pointer">
            <p className="text-xs md:text-sm">
              {currentDocuments.length} of {filteredDocuments.length} documents
            </p>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <Error message={error} />}

        {!loading && !error && currentDocuments.length === 0 && (
          <p className="bg-white text-center p-4 rounded-lg text-gray-500">
            No documents found.
          </p>
        )}

        {!loading &&
          !error &&
          currentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="grid grid-cols-1 items-center text-start px-4 py-3 rounded-lg hover:bg-emerald-100 duration-200 cursor-pointer relative border-b border-b-gray-100"
            >
              <div className="flex justify-between items-center md:gap-4 text-sm md:text-base">
                <p className="font-semibold md:w-66">
                  {documentType === "quarterly"
                    ? `Quarter ${doc.quarter} - ${doc.year}`
                    : `Annual Income Tax - ${doc.year}`}
                </p>
                <div className="flex items-center justify-end gap-10 md:w-46 relative z-0">
                  <p className="text-end md:w-44 relative z-0">
                    {doc.created_at
                      ? new Date(doc.created_at).toLocaleDateString()
                      : ""}
                  </p>
                  <button
                    onClick={() => toggleMenu(doc.id)}
                    className="relative bg-gray-50 w-7 h-7 rounded-full cursor-pointer"
                  >
                    ⋮
                  </button>
                </div>
              </div>
              {openMenuId === doc.id && (
                <div
                  ref={menuRef}
                  className="absolute top-2 right-2 w-32 bg-white shadow flex flex-col rounded-lg p-2 z-[1000] text-sm text-gray-500"
                >
                  <button
                    onClick={() => handleDownload(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200 cursor-pointer"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleEmail(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200 cursor-pointer"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 text-red-500 hover:bg-red-100 transition duration-200 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      {showModalDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-gray-600 p-10 rounded-xl relative shadow-xl max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
            <p className="text-lg md:text-2xl font-semibold text-center tracking-tighter text-red-600">
              Are you sure you want to delete this Document?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 font-semibold text-white rounded-lg hover:bg-red-700 transition duration-200 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModalDelete(false)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-300  duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-200 transition duration-200 disabled:opacity-50"
          >
            ←
          </button>
          <span className="text-sm px-4 py-2 text-gray-500">
            {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default DocumentsPages;
