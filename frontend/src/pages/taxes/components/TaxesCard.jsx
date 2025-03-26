import React from "react";
import { Link } from "react-router-dom";
import ButtonPrimary from "../../../components/ui/button/ButtonPrimary";

const TaxesCard = ({ title, date, deadline, documentType }) => {
  const routesMap = {
    quarterly: "/taxes/new-quarterly",
    annual: "/taxes/new-annual",
  };

  const route = routesMap[documentType];

  return (
    <div className="bg-emerald-50 hover:bg-emerald-100 hover:scale-104 transition duration-300 rounded-xl p-10 space-y-4 mb-8 max-w-4xl">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-3xl font-semibold tracking-tighter">{title}</h2>
        <p className="text-lg tracking-tighter">{date}</p>
        <p className="text-lg tracking-tighter">Deadline: {deadline}</p>
        <p className="text-gray-500 mb-2">
          Start your quarter as soon as possible to keep track of your income
          and expenses.
        </p>
      </div>
      <div className="flex justify-center space-x-4">
        <Link to={route}>
          <ButtonPrimary>Create New Tax</ButtonPrimary>
        </Link>
        <Link to="/documents">
          <button className="px-6 py-2 bg-white rounded-lg text-emerald-600 font-semibold transition duration-200 cursor-pointer leading-5">
            View Submitted Taxes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaxesCard;
