import React from "react";
import TaxesCard from "./TaxesCard";

const Taxes = () => {
  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20 space-y-6">
      <div className="grid grid-cols-1 gap-8 mx-auto lg:flex">
        <TaxesCard title="Quarterly Taxes" documentType="trimestral" />
        <TaxesCard title="Annual Income Tax" documentType="anual" />
      </div>
    </section>
  );
};

export default Taxes;
