import db from "../models/db.js";

export const createQuarterlyForm = async (req, res) => {
  const { userId } = req.params;
  const {
    year,
    quarter,
    total_income,
    deductible_expenses,
    net_income,
    previous_payments,
    withholding_taxes,
    deductions,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO quarterly_tax 
      (user_id, year, quarter, total_income, deductible_expenses, net_income, previous_payments, withholding_taxes, deductions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        year,
        quarter,
        total_income,
        deductible_expenses,
        net_income,
        previous_payments,
        withholding_taxes,
        deductions,
      ]
    );
    res
      .status(201)
      .json({ message: "Quarterly tax saved!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuarterlyForms = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM quarterly_tax WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuarterlyForm = async (req, res) => {
  const { userId, formId } = req.params;
  const {
    year,
    quarter,
    total_income,
    deductible_expenses,
    net_income,
    previous_payments,
    withholding_taxes,
    deductions,
  } = req.body;

  try {
    await db.execute(
      `UPDATE quarterly_tax SET year=?, quarter=?, total_income=?, deductible_expenses=?, net_income=?, previous_payments=?, withholding_taxes=?, deductions=? 
       WHERE id=? AND user_id=?`,
      [
        year,
        quarter,
        total_income,
        deductible_expenses,
        net_income,
        previous_payments,
        withholding_taxes,
        deductions,
        formId,
        userId,
      ]
    );
    res.status(200).json({ message: "Quarterly tax updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuarterlyForm = async (req, res) => {
  const { userId, formId } = req.params;
  try {
    await db.execute("DELETE FROM quarterly_tax WHERE id=? AND user_id=?", [
      formId,
      userId,
    ]);
    res.status(200).json({ message: "Quarterly tax deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// --- Annual ---
export const createAnnualForm = async (req, res) => {
  const { userId } = req.params;
  const {
    year,
    taxpayer_name,
    taxpayer_nif,
    spouse_name,
    spouse_nif,
    marital_status,
    address,
    autonomous_community,
    income_from_work,
    business_income,
    capital_gains,
    deductions,
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO annual_tax 
      (user_id, year, taxpayer_name, taxpayer_nif, spouse_name, spouse_nif, marital_status, address, autonomous_community, income_from_work, business_income, capital_gains, deductions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        year,
        taxpayer_name,
        taxpayer_nif,
        spouse_name,
        spouse_nif,
        marital_status,
        address,
        autonomous_community,
        income_from_work,
        business_income,
        capital_gains,
        deductions,
      ]
    );
    res.status(201).json({ message: "Annual tax saved!", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnnualForms = async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await db.execute(
      "SELECT * FROM annual_tax WHERE user_id = ?",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAnnualForm = async (req, res) => {
  const { userId, formId } = req.params;
  const {
    year,
    taxpayer_name,
    taxpayer_nif,
    spouse_name,
    spouse_nif,
    marital_status,
    address,
    autonomous_community,
    income_from_work,
    business_income,
    capital_gains,
    deductions,
  } = req.body;

  try {
    await db.execute(
      `UPDATE annual_tax SET year=?, taxpayer_name=?, taxpayer_nif=?, spouse_name=?, spouse_nif=?, marital_status=?, address=?, autonomous_community=?, income_from_work=?, business_income=?, capital_gains=?, deductions=? 
       WHERE id=? AND user_id=?`,
      [
        year,
        taxpayer_name,
        taxpayer_nif,
        spouse_name,
        spouse_nif,
        marital_status,
        address,
        autonomous_community,
        income_from_work,
        business_income,
        capital_gains,
        deductions,
        formId,
        userId,
      ]
    );
    res.status(200).json({ message: "Annual tax updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAnnualForm = async (req, res) => {
  const { userId, formId } = req.params;
  try {
    await db.execute("DELETE FROM annual_tax WHERE id=? AND user_id=?", [
      formId,
      userId,
    ]);
    res.status(200).json({ message: "Annual tax deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createQuarterlyForm,
  getQuarterlyForms,
  updateQuarterlyForm,
  deleteQuarterlyForm,
  createAnnualForm,
  getAnnualForms,
  updateAnnualForm,
  deleteAnnualForm,
};
