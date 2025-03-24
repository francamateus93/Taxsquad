import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/data/Api";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";

const NewQuarterly = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: "",
    quarter: "",
    income: "",
    deductibleExpenses: "",
    netIncome: "",
    previousPayments: "",
    withholdingTaxes: "",
    housingDeduction: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await api.post("/taxes/quarterly", form);
    navigate("/taxes");
  };

  const handleCancel = () => {
    navigate("/taxes");
  };

  return (
    <section className="container mx-auto p-8">
      <h2 className="text-2xl font-bold">New Quarterly Tax (Modelo 130)</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="quarter"
          placeholder="Quarter (e.g., Q1)"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="income"
          placeholder="Total Income"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="deductibleExpenses"
          placeholder="Deductible Expenses"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="netIncome"
          placeholder="Net Income"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="previousPayments"
          placeholder="Previous Payments"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="withholdingTaxes"
          placeholder="Withholding Taxes"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="housingDeduction"
          placeholder="Housing Deduction"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <ButtonPrimary type="submit">Save Tax</ButtonPrimary>
          <Link to="/taxes">
            <ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewQuarterly;
