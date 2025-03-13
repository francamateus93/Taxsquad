import express, { Router } from "express";
import { db } from "../server.js";

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const { user_id, document_type, file_name, file_path } = req.body;
  const [result] = await db.query(
    `INSERT INTO documents (user_id, document_type, file_name, file_path)
     VALUES (?, ?, ?, ?)`,
    [user_id, document_type, file_name, file_path]
  );
  res.json({ document_id: result.insertId });
});

router.get("/:id", async (req, res) => {
  const [rows] = await db.query(`SELECT * FROM documents WHERE document_id=?`, [
    req.params.id,
  ]);
  res.json(rows[0]);
});

router.put("/:id", async (req, res) => {
  const { file_name, file_path } = req.body;
  await db.query(
    `UPDATE documents SET file_name=?, file_path=? WHERE document_id=?`,
    [file_name, file_path, req.params.id]
  );
  res.json({ message: "Document updated" });
});

router.delete("/:id", async (req, res) => {
  await db.query(`DELETE FROM documents WHERE document_id=?`, [req.params.id]);
  res.json({ message: "Document deleted" });
});

export default router;
