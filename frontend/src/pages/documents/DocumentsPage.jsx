import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { fetchQuarterlyTax } from "../../store/slices/quarterlyTaxSlice.js";
import { fetchAnnualTax } from "../../store/slices/annualTaxSlice.js";
import LoadingSpinner from "../../components/utils/LoadingSpinner";
import Error from "../../components/utils/Error";

const DocumentsPages = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const {
    quarterlyTax,
    loading: loadingQuarterly,
    error: errorQuarterly,
  } = useSelector((state) => state.quarterlyTax);
  const {
    annualTax,
    loading: loadingAnnual,
    error: errorAnnual,
  } = useSelector((state) => state.annualTax);

  const [documentType, setDocumentType] = useState("quarterly");
  const [dateFilter, setDateFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    if (documentType === "quarterly") {
      dispatch(fetchQuarterlyTax({ userId }));
    } else {
      dispatch(fetchAnnualTax({ userId }));
    }
  }, [dispatch, userId, documentType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [documentType, dateFilter]);

  const data = documentType === "quarterly" ? quarterlyTax : annualTax;
  const loading =
    documentType === "quarterly" ? loadingQuarterly : loadingAnnual;
  const error = documentType === "quarterly" ? errorQuarterly : errorAnnual;

  const filteredDocuments = data.filter((doc) => {
    if (!dateFilter) return true;
    return doc.date >= dateFilter;
  });

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleDownload = (doc) => {
    console.log("Download", doc);
  };

  const handleEmail = (doc) => {
    console.log("Enviar por email", doc);
  };

  const handleDelete = (doc) => {
    console.log("Deletar", doc);
  };

  return (
    <section className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-end space-x-2">
        {/* Quarterly/Annual Toggle */}
        <div className="flex space-x-2">
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
        <div className="flex items-center space-x-1 px-4 text-gray-500">
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
      <div className="bg-white p-4 rounded-2xl shadow-[0_0px_5px_rgba(0,0,0,0.1)] overflow-y-auto hover:shadow-lg transition duration-300 relative">
        <div className="grid grid-cols-2 px-4 py-2 tracking-tight font-semibold">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => handleSort("client_name")}
          >
            <p>Document</p>
            <img
              src="https://img.icons8.com/?size=24&id=85502&format=png"
              alt="arrow down"
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-end cursor-pointer">
            <p className="text-sm">
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
              className="grid grid-cols-1 items-center text-start px-4 py-2 rounded-lg hover:bg-emerald-100 duration-200 cursor-pointer relative border-b border-b-gray-100"
            >
              <div className="md:flex justify-between items-center md:gap-4">
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
                  className="absolute top-12 right-0 w-32 bg-white shadow flex flex-col rounded-lg p-2 z-80 text-sm text-gray-500"
                >
                  <button
                    onClick={() => handleDownload(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleEmail(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 hover:bg-emerald-100 transition duration-200"
                  >
                    Send Email
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(doc)}
                    className="block w-full rounded-md text-left px-2 py-2 text-red-500 hover:bg-red-100 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

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
