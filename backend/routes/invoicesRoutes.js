import { Router } from "express";
import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getIncomeInvoices,
  getExpenseInvoices,
} from "../controllers/invoicesController.js";
import { verifyToken } from "../utils/jwtUtils.js";

const router = Router();

router.get("/users/:userId/invoices", verifyToken, getInvoices);
router.get("/users/:userId/invoices/income", verifyToken, getIncomeInvoices);
router.get("/users/:userId/invoices/expense", verifyToken, getExpenseInvoices);
router.post("/users/:userId/invoices", verifyToken, createInvoice);
router.put("/users/:userId/invoices/:invoiceId", verifyToken, updateInvoice);
router.delete("/users/:userId/invoices/:invoiceId", verifyToken, deleteInvoice);

export default router;
