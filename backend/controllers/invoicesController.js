import db from "../models/db.js";

export const getInvoices = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;

  try {
    const [invoices] = await db.execute(
      `SELECT * FROM invoices WHERE user_id = ? AND invoice_type = ? ORDER BY date DESC`,
      [userId, type]
    );
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllInvoices = async (req, res) => {
  const { userId } = req.params;

  try {
    const [invoices] = await db.execute(
      `SELECT * FROM invoices WHERE user_id = ? ORDER BY date DESC`,
      [userId]
    );
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIncomeInvoices = async (req, res) => {
  const { userId } = req.params;

  try {
    const [invoices] = await db.execute(
      `SELECT * FROM invoices WHERE user_id = ? AND invoice_type = 'income' ORDER BY date DESC`,
      [userId]
    );
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExpenseInvoices = async (req, res) => {
  const { userId } = req.params;

  try {
    const [invoices] = await db.execute(
      `SELECT * FROM invoices WHERE user_id = ? AND invoice_type = 'expense' ORDER BY date DESC`,
      [userId]
    );
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInvoice = async (req, res) => {
  const { userId } = req.params;
  const {
    number,
    date,
    client_name,
    client_id,
    client_address,
    city,
    country,
    concept,
    quantity,
    price,
    vat,
    irpf,
    currency,
    payment_method,
    invoice_type,
  } = req.body;

  try {
    const total_amount =
      quantity * price +
      (quantity * price * vat) / 100 +
      (quantity * price * irpf) / 100;
    const [result] = await db.execute(
      `INSERT INTO invoices 
      (user_id, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount, invoice_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        number,
        date,
        client_name,
        client_id,
        client_address,
        city,
        country,
        concept,
        quantity,
        price,
        vat,
        irpf,
        currency,
        payment_method,
        total_amount,
        invoice_type,
      ]
    );
    res.status(201).json({
      message: "Invoice created successfully",
      invoiceId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInvoice = async (req, res) => {
  const { userId, invoiceId } = req.params;
  const {
    number,
    date,
    client_name,
    client_id,
    client_address,
    city,
    country,
    concept,
    quantity,
    price,
    vat,
    irpf,
    currency,
    payment_method,
    invoice_type,
  } = req.body;

  const total_amount =
    quantity * price +
    (quantity * price * vat) / 100 +
    (quantity * price * irpf) / 100;

  try {
    const [result] = await db.execute(
      `INSERT INTO invoices (user_id, number, date, client_name, client_id, client_address, city, country, concept, quantity, price, vat, irpf, currency, payment_method, total_amount, invoice_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        number,
        date,
        client_name,
        client_id,
        client_address,
        city,
        country,
        concept,
        quantity,
        price,
        vat,
        irpf,
        currency,
        payment_method,
        total_amount,
        invoice_type,
      ]
    );
    res.status(201).json({
      message: "Invoice created successfully",
      invoiceId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteInvoice = async (req, res) => {
  const { userId, invoiceId } = req.params;

  try {
    await db.execute(`DELETE FROM invoices WHERE id=? AND user_id=?`, [
      invoiceId,
      userId,
    ]);
    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getInvoices,
  getIncomeInvoices,
  getExpenseInvoices,
  updateInvoice,
  createInvoice,
  deleteInvoice,
};
