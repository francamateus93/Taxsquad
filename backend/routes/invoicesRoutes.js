import { Router } from "express";
const router = Router();
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getIncomeInvoices,
  getExpenseInvoices,
} from "../controllers/invoicesController";
import { verifyToken } from "../utils/jwtUtils";

router.get("/users/:userId", verifyToken, getInvoices);
router.get("/users/:userId/invoices/income", getIncomeInvoices);
router.get("/users/:userId/invoices/expense", getExpenseInvoices);
router.post("/users/:userId", verifyToken, createInvoice);
router.put("/invoices/invoiceId", verifyToken, updateInvoice);
router.delete("/invoices/invoiceId", verifyToken, deleteInvoice);

export default router;
