import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    identification_number,
    phone,
    address,
    city,
  } = req.body;

  const [result] = await db.query(
    `INSERT INTO users (first_name, last_name, date_of_birth, identification_number, phone, address, city) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      date_of_birth,
      identification_number,
      phone,
      address,
      city,
    ]
  );
  res.json({ user_id: result.insertId });
});

router.get("/:id", async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM users WHERE user_id = ?`, [
    req.params.id,
  ]);
  res.json(rows[0]);
});

router.put("/:id", async (req, res) => {
  const { first_name, last_name, phone, address } = req.body;
  await db.query(
    `UPDATE users SET first_name=?, last_name=?, phone=?, address=? WHERE user_id=?`,
    [first_name, last_name, phone, address, req.params.id]
  );
  res.json({ message: "User updated" });
});

router.delete("/:id", async (req, res) => {
  await db.query(`DELETE FROM users WHERE user_id=?`, [req.params.id]);
  res.json({ message: "User deleted" });
});

export default router;
