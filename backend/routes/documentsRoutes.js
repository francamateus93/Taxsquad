import { Router } from "express";
import {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/documentsController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = Router();

router.get("/users/:userId/documents", verifyToken, getDocuments);
router.get(
  "/users/:userId/documents/:documentId",
  verifyToken,
  getDocumentById
);
router.post("/users/:userId/documents", verifyToken, createDocument);
router.put("/users/:userId/documents/:documentId", verifyToken, updateDocument);
router.delete(
  "/users/:userId/documents/:documentId",
  verifyToken,
  deleteDocument
);

export default router;
