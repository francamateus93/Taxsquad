import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import Navbar from "../features/navbar/Navbar.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import AuthListener from "../app/authListener.js";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  LandingPage,
  Login,
  Register,
  NotFound,
  DashboardPage,
  InvoicesPage,
  NewIncomeInvoice,
  NewExpenseInvoice,
  EditInvoicePage,
  TaxesPages,
  NewAnnual,
  NewQuarterly,
  DocumentsPages,
  ProfilePage,
} from "./LazyRoutes.js";

const AppRouter = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <AuthListener />
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Router>
    </>
  );
};

export default AppRouter;
