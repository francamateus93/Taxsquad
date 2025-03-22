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

const AppRouter = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <AuthListener />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route path="*" element={<NotFound />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <DashboardPage />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/invoices"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <Invoices />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/invoices/new-income"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <NewInvoiceIncome />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/invoices/new-expense"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <NewInvoiceExpense />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/taxes"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <Taxes />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/taxes/new-annual"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <NewAnnual />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/taxes/new-quarterly"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <NewQuarterly />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/documents"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <Documents />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <PrivateRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
