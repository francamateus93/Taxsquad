import db from "../models/db.js";

// Get All Documents
export const getDocuments = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;

  try {
    const [documents] = await db.execute(
      `SELECT * FROM documents WHERE user_id=? AND document_type=? ORDER BY created_at DESC`,
      [userId, type]
    );
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDocumentById = async (req, res) => {
  const { userId, documentId } = req.params;
  try {
    const [document] = await db.execute(
      `SELECT * FROM documents WHERE user_id=? AND id=?`,
      [userId, documentId]
    );
    if (document.length === 0)
      return res.status(404).json({ message: "Document not found" });

    res.status(200).json(document[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDocument = async (req, res) => {
  const { userId } = req.params;
  const { document_name, year, period, document_data, document_type } =
    req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO documents (user_id, document_name, year, period, document_data, document_type) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        document_name,
        year,
        period,
        JSON.stringify(document_data),
        document_type,
      ]
    );
    res
      .status(201)
      .json({
        message: "Document created successfully",
        documentId: result.insertId,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDocument = async (req, res) => {
  const { userId, documentId } = req.params;
  const { document_name, year, period, data, document_type } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE documents 
      SET document_name = ?, year = ?, period = ?, document_data = ?, document_type = ?
      WHERE user_id = ? AND id = ?`,
      [
        document_name,
        year,
        period,
        JSON.stringify(data),
        document_type,
        userId,
        documentId,
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Document not found" });

    res.status(200).json({ message: "Document updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const [result] = await db.execute(
      `DELETE FROM documents WHERE user_id = ? AND id = ?`,
      [documentId]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Document not found" });
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
};
