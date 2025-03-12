import express from "express";
import pool from "../db.js";

const router = express.Router();

// Adicionar documento
router.post("/", async (req, res) => {
  const { user_id, document_type, file_name, file_path } = req.body;
  const [result] = await pool.query(
    `INSERT INTO documents (user_id, document_type, file_name, file_path)
     VALUES (?, ?, ?, ?)`,
    [user_id, document_type, file_name, file_path]
  );
  res.json({ document_id: result.insertId });
});

// Obter documento por id
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query(
    `SELECT * FROM documents WHERE document_id=?`,
    [req.params.id]
  );
  res.json(rows[0]);
});

// Atualizar documento por id
router.put("/:id", async (req, res) => {
  const { file_name, file_path } = req.body;
  await pool.query(
    `UPDATE documents SET file_name=?, file_path=? WHERE document_id=?`,
    [file_name, file_path, req.params.id]
  );
  res.json({ message: "Document updated" });
});

// Deletar documento por id
router.delete("/:id", async (req, res) => {
  await pool.query(`DELETE FROM documents WHERE document_id=?`, [
    req.params.id,
  ]);
  res.json({ message: "Document deleted" });
});

export default router;
