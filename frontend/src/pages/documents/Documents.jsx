import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumentsByType } from "../../store/slices/documentsSlice";

const Documents = ({ user }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [documentType, setDocumentType] = useState("quarterly");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    dispatch(fetchDocumentsByType({ userId, type: documentType }));
  }, [dispatch, , userId, documentType]);

  // Filter by date
  const filteredDocuments = documents.filter((invoice) => {
    if (!dateFilter) return true;
    return documents.date >= dateFilter;
  });

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20 space-y-6">
      {/* Buttons: Quarterly and Annual */}
      <div className="flex space-x-4 mb-12">
        <button
          onClick={() => setDocumentType("quarterly")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            documentType === "quarterly"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Quarterly
        </button>

        <button
          onClick={() => setDocumentType("annual")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            documentType === "annual"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Annual
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-1 text-gray-500">
        <label htmlFor="dateFilter" className="font-semibold text-sm">
          Filter:
        </label>
        <input
          id="dateFilter"
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
          }}
          className="border-none text-sm"
        />
      </div>

      {/* Display Loading or Error */}
      {loading && <p className="text-gray-500">Loading documents...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* List of Documents */}
      <div className="space-y-2 bg-emerald-50 h-[600px] rounded-2xl p-4">
        {!loading && !error && (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex justify-between gap-4 max-w-7xl text-xs md:text-base text-start bg-white p-4 rounded-lg cursor-pointer hover:bg-emerald-200 transition"
              >
                <p className="font-semibold w-66">{doc.document_name}</p>
                <p className="w-46">
                  {new Date(doc.created_at).toLocaleDateString()}
                </p>
                <a
                  href={doc.file_path}
                  target="_blank"
                  rel="noreferrer"
                  className="w-56 text-end font-medium"
                >
                  View Document
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Documents;
