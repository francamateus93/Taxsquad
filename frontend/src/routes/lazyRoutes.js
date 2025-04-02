import { lazy } from "react";

export const LandingPage = lazy(() => import("../pages/LandingPage"));
export const Login = lazy(() => import("../pages/Login"));
export const Register = lazy(() => import("../pages/Register"));
export const NotFound = lazy(() => import("../pages/NotFoundPage"));
export const DashboardPage = lazy(() => import("../pages/DashboardPage"));
export const InvoicesPage = lazy(() => import("../pages/InvoicesPage"));
export const NewIncomeInvoice = lazy(() => import("../pages/NewIncomeInvoice"));
export const NewExpenseInvoice = lazy(() =>
  import("../pages/NewExpenseInvoice")
);
export const EditInvoicePage = lazy(() =>
  import("../features/invoices/EditInvoicePage")
);
export const TaxesPages = lazy(() => import("../pages/TaxesPage"));
export const NewAnnual = lazy(() => import("../pages/NewAnnualTax"));
export const NewQuarterly = lazy(() => import("../pages/NewQuarterlyTax"));
export const DocumentsPages = lazy(() => import("../pages/DocumentsPage"));
export const ProfilePage = lazy(() => import("../pages/ProfilePage"));
