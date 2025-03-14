import React from "react";
import { useNavigate } from "react-router-dom";

const TaxesCard = ({ title, documentType }) => {
  const navigate = useNavigate();

  const handleCreateTax = () => {
    navigate(`/taxes/new-${documentType}`);
  };

  const handleViewDocuments = () => {
    navigate(`/documents?type=${documentType}`);
  };

  return (
    <div className="bg-white rounded p-6 space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex space-x-2">
        <button
          onClick={handleCreateTax}
          className="px-4 py-2 bg-emerald-500 text-white rounded"
        >
          Create New Tax
        </button>

        <button
          onClick={handleViewDocuments}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          View Submitted Taxes
        </button>
      </div>
    </div>
  );
};

export default TaxesCard;
