import React from "react";
import TaxesCard from "./TaxesCard";

const Taxes = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tax Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaxesCard title="Quarterly Taxes" documentType="trimestral" />
        <TaxesCard title="Annual Income Tax" documentType="anual" />
      </div>
    </div>
  );
};

export default Taxes;
