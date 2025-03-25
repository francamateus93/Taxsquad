import React from "react";
import TaxesCard from "./components/TaxesCard";

const Taxes = () => {
  return (
    <section className="container mx-auto p-10 md:py-12 md:px-20 space-y-6">
      <div className="grid grid-cols-1 gap-8 mx-auto lg:flex">
        <TaxesCard
          title="Quarterly Taxes"
          date="January 1 - March 31, 2025"
          deadline="April 20, 2025"
          documentType="quarterly"
        />
        <TaxesCard
          title="Annual Income Tax"
          date="January 1 - December 31, 2025"
          deadline="July 30, 2025"
          documentType="annual"
        />
      </div>
    </section>
  );
};

export default Taxes;
