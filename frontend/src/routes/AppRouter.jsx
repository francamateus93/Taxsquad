import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/layout/navbar/Navbar";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/LandingPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import InvoicesPage from "../pages/invoices/InvoicesPage";
import NewExpenseInvoice from "../pages/invoices/components/NewExpenseInvoice.jsx";
import NewIncomeInvoice from "../pages/invoices/components/NewIncomeInvoice.jsx";
import TaxesPages from "../pages/taxes/TaxesPage.jsx";
import DocumentsPages from "../pages/documents/DocumentsPage.jsx";
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import AuthListener from "../components/auth/AuthListener.jsx";
import NewAnnual from "../pages/taxes/components/NewAnnualTax.jsx";
import NewQuarterly from "../pages/taxes/components/NewQuarterlyTax.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import EditInvoicePage from "../pages/invoices/EditInvoicePage.jsx";

const AppRouter = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <AuthListener />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <DashboardPage />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <InvoicesPage />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/invoices/new-income"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <NewIncomeInvoice />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/invoices/edit:id"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <EditInvoicePage />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/invoices/new-expense"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <NewExpenseInvoice />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/taxes"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <TaxesPages />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/taxes/new-annual"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <NewAnnual />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/taxes/new-quarterly"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <NewQuarterly />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <DocumentsPages />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthenticatedRoute>
                <PrivateRoute>
                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                </PrivateRoute>
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
