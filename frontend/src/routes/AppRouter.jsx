import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar.jsx";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/LandingPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Invoices from "../pages/invoices/Invoices";
import NewInvoiceExpense from "../pages/invoices/NewInvoiceExpense";
import NewInvoiceIncome from "../pages/invoices/NewInvoiceIncome";
import Taxes from "../pages/taxes/Taxes.jsx";
import Documents from "../pages/documents/Documents.jsx";
import Profile from "../pages/profile/Profile.jsx";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";
import AuthListener from "../components/auth/AuthListener.jsx";
import NewAnnual from "../pages/documents/NewAnnual.jsx";
import NewQuarterly from "../pages/documents/NewQuarterly.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";

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
                    <Invoices />
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
                    <NewInvoiceIncome />
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
                    <NewInvoiceExpense />
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
                    <Taxes />
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
                    <Documents />
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
                    <Profile />
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
