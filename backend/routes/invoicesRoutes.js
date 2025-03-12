import express from "express";
import pool from "../db.js";

const router = express.Router();

// Criar invoice
router.post("/", async (req, res) => {
  const {
    user_id,
    invoice_type,
    invoice_number,
    invoice_date,
    client_or_supplier_name,
    base_amount,
    vat_amount,
    irpf_amount,
    total_amount,
    currency,
    payment_method,
  } = req.body;

  const [result] = await pool.query(
    `INSERT INTO invoices (user_id, invoice_type, invoice_number, invoice_date,
      client_or_supplier_name, base_amount, vat_amount, irpf_amount,
      total_amount, currency, payment_method)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      invoice_type,
      invoice_number,
      invoice_date,
      client_or_supplier_name,
      base_amount,
      vat_amount,
      irpf_amount,
      total_amount,
      currency,
      payment_method,
    ]
  );

  res.json({ invoice_id: result.insertId });
});

// Obter invoices income
router.get("/income", async (req, res) => {
  const [rows] = await pool.query(
    `SELECT * FROM invoices WHERE invoice_type='income'`
  );
  res.json(rows);
});

// Obter invoices expense
router.get("/expense", async (req, res) => {
  const [rows] = await pool.query(
    `SELECT * FROM invoices WHERE invoice_type='expense'`
  );
  res.json(rows);
});

// Atualizar invoice por id
router.put("/:id", async (req, res) => {
  const { client_or_supplier_name, total_amount } = req.body;
  await pool.query(
    `UPDATE invoices SET client_or_supplier_name=?, total_amount=? WHERE invoice_id=?`,
    [client_or_supplier_name, total_amount, req.params.id]
  );
  res.json({ message: "Invoice updated" });
});

// Deletar invoice por id
router.delete("/:id", async (req, res) => {
  await pool.query(`DELETE FROM invoices WHERE invoice_id=?`, [req.params.id]);
  res.json({ message: "Invoice deleted" });
});

export default router;
