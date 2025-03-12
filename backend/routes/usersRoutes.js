import express from "express";
import pool from "../db.js";

const router = express.Router();

// Criar usuário
router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    identification_number,
    phone,
    address,
  } = req.body;
  const [result] = await pool.query(
    `INSERT INTO users (first_name, last_name, date_of_birth, identification_number, phone, address) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      date_of_birth,
      identification_number,
      phone,
      address,
    ]
  );
  res.json({ user_id: result.insertId });
});

// Obter usuário por id
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE user_id = ?`, [
    req.params.id,
  ]);
  res.json(rows[0]);
});

// Atualizar usuário por id
router.put("/:id", async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;
  await pool.query(
    `UPDATE users SET first_name=?, last_name=?, phone=?, address=? WHERE user_id=?`,
    [first_name, last_name, phone, address, req.params.id]
  );
  res.json({ message: "User updated" });
});

// Deletar usuário por id
router.delete("/:id", async (req, res) => {
  await pool.query(`DELETE FROM users WHERE user_id=?`, [req.params.id]);
  res.json({ message: "User deleted" });
});

export default router;
