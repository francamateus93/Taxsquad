import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/data/Api";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import ButtonSecondary from "../../components/ui/ButtonSecondary";

const NewAnnual = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    year: "",
    taxpayerName: "",
    taxpayerNIF: "",
    spouseName: "",
    spouseNIF: "",
    maritalStatus: "",
    address: "",
    autonomousCommunity: "",
    incomeWork: "",
    incomeBusiness: "",
    capitalGains: "",
    deductions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await api.post("/taxes/annual", form);
    navigate("/taxes");
  };

  const handleCancel = () => {
    navigate("/invoices");
  };

  return (
    <section className="container mx-auto p-8">
      <h2 className="text-2xl font-bold">
        New Annual Income Tax (Modelo D-100)
      </h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <input
          name="year"
          placeholder="Year"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="taxpayerName"
          placeholder="Taxpayer Name"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="taxpayerNIF"
          placeholder="Taxpayer NIF"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="spouseName"
          placeholder="Spouse Name"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="spouseNIF"
          placeholder="Spouse NIF"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="maritalStatus"
          placeholder="Marital Status"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="autonomousCommunity"
          placeholder="Autonomous Community"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="incomeWork"
          placeholder="Income from Work"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="incomeBusiness"
          placeholder="Business Income"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="capitalGains"
          placeholder="Capital Gains"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="deductions"
          placeholder="Deductions"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <div className="flex gap-2">
          <ButtonPrimary type="submit">Save Tax</ButtonPrimary>
          <Link to="/taxes">
            <ButtonSecondary>Cancel</ButtonSecondary>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default NewAnnual;
