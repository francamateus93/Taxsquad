import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "../components/Navbar/Navbar";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/LandingPage";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Invoices from "../pages/invoices/Invoices";
import NewInvoiceExpense from "../pages/invoices/NewInvoiceExpense";
import NewInvoiceIncome from "../pages/invoices/NewInvoiceIncome";
import Taxes from "../pages/Taxes";
import Documents from "../pages/Documents";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Invoices />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices/new-income"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <NewInvoiceIncome />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/invoices/new-expense"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <NewInvoiceExpense />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/taxes"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Taxes />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Documents />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default AppRouter;
