import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/ButtonPrimary";
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
    <div className="bg-emerald-50 hover:bg-emerald-100 transition duration-200 rounded-lg p-10 space-y-4 mb-8 max-w-4xl">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-3xl font-semibold tracking-tighter">{title}</h2>
        <p className="text-lg tracking-tighter ">January 1 - March 31, 2025</p>
        <p className="text-lg tracking-tighter ">Deadline: April 20, 2025</p>
        <p className="text-gray-500 mb-2">
          Start your quarter as soon as possible to keep track of your income
          and expenses.
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <Button onClick={handleCreateTax}>Create New Tax</Button>

        <button
          onClick={handleViewDocuments}
          className="px-6 py-2 bg-white rounded-lg text-emerald-600 font-semibold transition duration-200 cursor-pointer"
        >
          View Submitted Taxes
        </button>
      </div>
    </div>
  );
};

export default TaxesCard;
