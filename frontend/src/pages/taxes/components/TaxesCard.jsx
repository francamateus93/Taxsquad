import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";

const TaxesCard = ({ title, date, deadline, documentType }) => {
  const routesMap = {
    quarterly: "/taxes/new-quarterly",
    annual: "/taxes/new-annual",
  };

  const route = routesMap[documentType];

  return (
    <div className="bg-white shadow-[0_0px_5px_rgba(0,0,0,0.1)] hover:shadow-xl transition duration-300 rounded-xl p-10 space-y-4 mb-8 max-w-4xl">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-3xl font-semibold tracking-tighter">{title}</h2>
        <p className="text-lg tracking-tighter">{date}</p>
        <p className="text-lg tracking-tighter">Deadline: {deadline}</p>
        <p className="text-gray-500 mb-2 tracking-tight">
          Start your quarter as soon as possible to keep track of your income
          and expenses.
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <Link to={route}>
          <ButtonPrimary>Create New Tax</ButtonPrimary>
        </Link>
        <Link to="/documents">
          <ButtonSecondary>View Submitted Taxes</ButtonSecondary>
        </Link>
      </div>
    </div>
  );
};

export default TaxesCard;
