import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [stats, setStats] = useState({ income: 0, expenses: 0, invoices: 0 });

  return (
    <section className="container mx-auto p-12 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="font-semibold">Income</h3>
          <p className="text-xl text-emerald-600">${stats.income}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="font-semibold">Expenses</h3>
          <p className="text-xl text-red-500">${stats.expenses}</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <h3 className="font-semibold">Invoices</h3>
          <p className="text-xl text-blue-600">{stats.invoices} total</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
