import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../views/LandingPage";
import Dashboard from "../views/Dashboard";
import Invoices from "../views/Invoices";
import Taxes from "../views/Taxes";
import Documents from "../views/Documents";
import Profile from "../views/Profile";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/taxes" element={<Taxes />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
