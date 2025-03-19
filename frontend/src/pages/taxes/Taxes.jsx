import React from "react";
import TaxesCard from "./TaxesCard";

const Taxes = () => {
  return (
    <section className="container mx-auto p-12 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaxesCard title="Quarterly Taxes" documentType="trimestral" />
        <TaxesCard title="Annual Income Tax" documentType="anual" />
      </div>
    </section>
  );
};

export default Taxes;
