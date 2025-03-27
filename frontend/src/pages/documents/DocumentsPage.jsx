import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const handleEdit = (doc) => {
    console.log("Editar", doc);
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
    <section className="container mx-auto p-10 lg:py-12 lg:px-20 space-y-6">
      {/* Quarterly/Annual Toggle */}
      <div className="flex space-x-2 mb-12">
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
      <div className="flex items-center space-x-1 text-gray-500">
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

      {/* Documents List */}
      <div className="space-y-2 bg-gray-100 rounded-2xl p-4">
        <div className="flex justify-between items-center px-4 tracking-tight">
          <p className="font-semibold">Document</p>
          <p className="text-sm">
            {currentDocuments.length} of {filteredDocuments.length} documents
          </p>
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
              className="grid grid-cols-1 text-start md:flex justify-between items-center md:gap-4 text-base bg-white px-4 py-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
            >
              <p className="font-semibold md:w-66">
                {documentType === "quarterly"
                  ? `Quarter ${doc.quarter} - ${doc.year}`
                  : `Annual Income Tax - ${doc.year}`}
              </p>
              <p className="text-right md:w-44">
                {doc.created_at
                  ? new Date(doc.created_at).toLocaleDateString()
                  : ""}
              </p>
              <button
                onClick={() => toggleMenu(doc.id)}
                className="bg-gray-50 w-8 h-8 rounded-full transition duration-200 text-lg cursor-pointer"
              >
                ⋮
              </button>
              {openMenuId === doc.id && (
                <div className="absolute right-4 top-48 z-10 bg-white shadow-lg rounded-lg flex flex-col gap-1 items-start justify-between text-sm w-48 p-3">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-emerald-100 transition duration-200 text-sm cursor-pointer"
                  >
                    Edit Document
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-emerald-100 transition duration-200 text-sm cursor-pointer"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => handleEmail(doc)}
                    className="w-full text-left px-2 py-2 rounded-lg hover:bg-emerald-100 transition duration-200 text-sm cursor-pointer"
                  >
                    Send by Email
                  </button>
                  <button
                    onClick={() => handleDelete(doc)}
                    className="w-full text-left px-2 py-2 rounded-lg text-red-500 hover:bg-red-100 transition duration-200 text-sm cursor-pointer"
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
