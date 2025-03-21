import { Router } from "express";
const router = Router();
import {
  getDocuments,
  createDocument,
  getDocumentById,
  updateDocument,
  deleteDocument,
} from "../controllers/documentsController";
import { verifyToken } from "../utils/jwtUtils";

router.get("/users/:userId/documents", getDocuments);
router.post("/users/:userId/documents", createDocument);
router.post("/users/:userId/documents/:documentId", getDocumentById);
router.put("/users/:userId/documents/:documentId", updateDocument);
router.delete("/users/:userId/documents/:documentId", deleteDocument);

export default router;
