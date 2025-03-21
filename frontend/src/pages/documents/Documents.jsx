import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocumentsByType } from "../../store/slices/documentsSlice";
// import { useSearchParams } from "react-router-dom";
// import { setDocuments, setLoading, setError } from "../../store/documentsSlice";
// import api from "../../services/data/Api";

const Documents = ({ user }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const { documents, loading, error } = useSelector((state) => state.documents);
  const [type, setType] = useState("trimestral");
  // const query = new URLSearchParams(window.location.search);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     dispatch(setLoading(true));
  //     try {
  //       const response = await api.get(`/documents?type=${documentType}`);
  //       // const response = await api.get(`/documents?user_id=${user.id}`);
  //       dispatch(setDocuments(response.data));
  //     } catch (err) {
  //       dispatch(setError(err.message));
  //     } finally {
  //       dispatch(setLoading(false));
  //     }
  //   };

  //   fetchDocuments();
  // }, [documentType, dispatch]);

  useEffect(() => {
    dispatch(fetchDocumentsByType({ type, userId }));
  }, [dispatch, type, userId]);

  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20 space-y-6">
      {/* Buttons: Trimestral and Anual */}
      <div className="flex space-x-4">
        <button
          onClick={() => setType("trimestral")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            documentType === "trimestral"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Quarterly
        </button>

        <button
          onClick={() => setType("anual")}
          className={`px-6 py-2 rounded-lg cursor-pointer tracking-tighter text-center ${
            documentType === "anual"
              ? "bg-emerald-200 w-40 h-14 text-2xl font-semibold hover:bg-emerald-300 text-emerald-600 transition duration-200"
              : "bg-emerald-50 text-emerald-600 w-40 h-14 text-lg font-normal hover:bg-emerald-200 transition duration-200"
          }`}
        >
          Annual
        </button>
      </div>

      {/* Display Loading or Error */}
      {loading && <p className="text-gray-500">Loading documents...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* List of Documents */}
      {!loading && !error && (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.id} className="bg-white shadow rounded p-4">
              <p className="font-semibold">{doc.document_name}</p>
              <p>{new Date(doc.created_at).toLocaleDateString()}</p>
              {/* <a href={doc.file_path} target="_blank" rel="noreferrer">
                View Document
              </a> */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Documents;
