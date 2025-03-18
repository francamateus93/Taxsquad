import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

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
        <Button
          onClick={handleCreateTax}
          className="px-4 py-2 bg-emerald-500 text-white rounded"
        >
          Create New Tax
        </Button>

        <ButtonSecondary
          onClick={handleViewDocuments}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          View Submitted Taxes
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default TaxesCard;
