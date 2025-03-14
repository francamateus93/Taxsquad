import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDocuments, setLoading, setError } from "../store/documentsSlice";
import api from "../services/data/Api";

const Documents = () => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [documentType, setDocumentType] = useState("trimestral");

  useEffect(() => {
    const fetchDocuments = async () => {
      dispatch(setLoading(true));
      try {
        const response = await api.get(`/documents?type=${documentType}`);
        // const response = await api.get(`/documents?user_id=${user.id}`);
        dispatch(setDocuments(response.data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDocuments();
  }, [documentType, dispatch]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Documents</h1>

      {/* Buttons: Trimestral and Anual */}
      <div className="flex space-x-4">
        <button
          onClick={() => setDocumentType("trimestral")}
          className={`px-4 py-2 rounded ${
            documentType === "trimestral"
              ? "bg-emerald-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Trimestral
        </button>

        <button
          onClick={() => setDocumentType("anual")}
          className={`px-4 py-2 rounded ${
            documentType === "anual"
              ? "bg-emerald-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Anual
        </button>
      </div>

      {/* Display Loading or Error */}
      {loading && <p className="text-gray-500">Loading documents...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* List of Documents */}
      {!loading && !error && (
        <ul className="space-y-2">
          {documents
            .filter((doc) => doc.document_type === documentType)
            .map((doc) => (
              <li
                key={doc.document_id}
                className="bg-white shadow-md p-4 rounded hover:bg-gray-100 cursor-pointer"
              >
                <h3 className="font-semibold">{doc.file_name}</h3>
                <p>
                  Uploaded on: {new Date(doc.created_at).toLocaleDateString()}
                </p>
                <a
                  href={doc.file_path}
                  target="_blank"
                  className="text-emerald-600 hover:underline"
                >
                  View Document
                </a>
              </li>
            ))}
        </ul>
      )}

      {/* Loading & Error Handling */}
      {loading && <p className="text-gray-500">Loading documents...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
    </div>
  );
};

export default Documents;
