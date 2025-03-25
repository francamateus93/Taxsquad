import express from "express";
import {
  createQuarterlyForm,
  getQuarterlyForms,
  updateQuarterlyForm,
  deleteQuarterlyForm,
  createAnnualForm,
  getAnnualForms,
  updateAnnualForm,
  deleteAnnualForm,
} from "../controllers/taxesController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = express.Router();

// Quarterly
router.post("/users/:userId/new-quarterly", verifyToken, createQuarterlyForm);
router.get("/users/:userId/new-quarterly/", verifyToken, getQuarterlyForms);
router.put(
  "/users/:userId/new-quarterly/:formId",
  verifyToken,
  updateQuarterlyForm
);
router.delete(
  "/users/:userId/new-quarterly/:formId",
  verifyToken,
  deleteQuarterlyForm
);

// Annual
router.post("/users/:userId/new-annual", verifyToken, createAnnualForm);
router.get("/users/:userId/new-annual", verifyToken, getAnnualForms);
router.put("/users/:userId/new-annual/:formId", verifyToken, updateAnnualForm);
router.delete(
  "/users/:userId/new-annual/:formId",
  verifyToken,
  deleteAnnualForm
);

export default router;
