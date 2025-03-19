import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setDocuments, setLoading, setError } from "../../store/documentsSlice";
import api from "../../services/data/Api";

const Documents = ({ user }) => {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [documentType, setDocumentType] = useState("trimestral");
  const query = new URLSearchParams(window.location.search);

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
    <section className="container mx-auto p-12 space-y-6">
      <h1 className="text-2xl font-bold uppercase tracking-tighter">
        Documents
      </h1>

      {/* Buttons: Trimestral and Anual */}
      <div className="flex space-x-4">
        <button
          onClick={() => setDocumentType("trimestral")}
          className={`px-6 py-2 rounded cursor-pointer text-center ${
            documentType === "trimestral"
              ? "bg-emerald-500 text-white font-semibold hover:bg-emerald-600"
              : "bg-emerald-50 text-emerald-600 font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Trimestral
        </button>

        <button
          onClick={() => setDocumentType("anual")}
          className={`px-6 py-2 rounded cursor-pointer text-center ${
            documentType === "anual"
              ? "bg-emerald-500 text-white font-semibold hover:bg-emerald-600"
              : "bg-emerald-50 text-emerald-600 font-normal hover:bg-emerald-200 transition duration-200"
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
              <li key={doc.document_id} className="bg-white shadow rounded p-4">
                <p className="font-semibold">{doc.file_name}</p>
                <p>{new Date(doc.created_at).toLocaleDateString()}</p>
                <a href={doc.file_path} target="_blank" rel="noreferrer">
                  View Document
                </a>
              </li>
            ))}
        </ul>
      )}
    </section>
  );
};

export default Documents;
