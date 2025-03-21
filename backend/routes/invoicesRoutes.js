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

router.get("/users/:userId/invoices", verifyToken, getInvoices);
router.get("/users/:userId/invoices/income", verifyToken, getIncomeInvoices);
router.get("/users/:userId/invoices/expense", verifyToken, getExpenseInvoices);
router.post("/users/:userId/invoices", verifyToken, createInvoice);
router.put("/invoices/:invoiceId", verifyToken, updateInvoice);
router.delete("/invoices/:invoiceId", verifyToken, deleteInvoice);

export default router;
