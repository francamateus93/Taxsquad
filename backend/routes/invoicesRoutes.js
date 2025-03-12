import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

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

  const [result] = await db.query(
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
  const [rows] = await db.query(
    `SELECT * FROM invoices WHERE invoice_type='income'`
  );
  res.json(rows);
});

// Obter invoices expense
router.get("/expense", async (req, res) => {
  const [rows] = await db.query(
    `SELECT * FROM invoices WHERE invoice_type='expense'`
  );
  res.json(rows);
});

// Atualizar invoice ºr id
router.put("/:id", async (req, res) => {
  const { client_or_supplier_name, total_amount } = req.body;
  await db.query(
    `UPDATE invoices SET client_or_supplier_name=?, total_amount=? WHERE invoice_id=?`,
    [client_or_supplier_name, total_amount, req.params.id]
  );
  res.json({ message: "Invoice updated" });
});

// Deletar invoice por id
router.delete("/:id", async (req, res) => {
  await db.query(`DELETE FROM invoices WHERE invoice_id=?`, [req.params.id]);
  res.json({ message: "Invoice deleted" });
});

export default router;
