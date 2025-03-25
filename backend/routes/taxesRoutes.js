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
router.get(
  "/users/:userId/new-quarterly/:formId",
  verifyToken,
  getQuarterlyForms
);
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
router.post("/users/:userId/new-annual", createAnnualForm);
router.get("/users/:userId/new-annual", getAnnualForms);
router.put("/users/:userId/new-annual/:formId", updateAnnualForm);
router.delete("/users/:userId/new-annual/:formId", deleteAnnualForm);

export default router;
