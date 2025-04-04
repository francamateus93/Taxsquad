import { lazy } from "react";

export const LandingPage = lazy(() => import("../pages/LandingPage"));
export const Login = lazy(() => import("../pages/auth/Login"));
export const Register = lazy(() => import("../pages/auth/Register"));
export const NotFound = lazy(() => import("../pages/NotFoundPage"));
export const DashboardPage = lazy(() => import("../pages/DashboardPage"));
export const InvoicesPage = lazy(() =>
  import("../pages/invoices/InvoicesPage")
);
export const NewIncomeInvoice = lazy(() =>
  import("../pages/invoices/NewIncomeInvoice")
);
export const NewExpenseInvoice = lazy(() =>
  import("../pages/invoices/NewExpenseInvoice")
);
export const EditInvoicePage = lazy(() =>
  import("../features/invoices/EditInvoicePage")
);
export const TaxesPages = lazy(() => import("../pages/TaxesPage"));
export const NewAnnual = lazy(() => import("../pages/documents/NewAnnualTax"));
export const NewQuarterly = lazy(() =>
  import("../pages/documents/NewQuarterlyTax")
);
export const DocumentsPages = lazy(() =>
  import("../pages/documents/DocumentsPage")
);
export const ProfilePage = lazy(() => import("../pages/ProfilePage"));
