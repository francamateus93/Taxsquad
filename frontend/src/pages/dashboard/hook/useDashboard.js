import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllInvoices } from "../../../store/slices/invoicesSlice";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const { invoices, loading, error } = useSelector((state) => state.invoices);

  useEffect(() => {
    if (!userId) navigate("/login");
    dispatch(fetchAllInvoices({ userId }));
  }, [dispatch, userId, navigate]);

  const incomeTotal = invoices
    .filter((invoice) => invoice.invoice_type === "income")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const expenseTotal = invoices
    .filter((invoice) => invoice.invoice_type === "expense")
    .reduce((total, invoice) => total + Number(invoice.total_amount), 0);

  const balance = incomeTotal - expenseTotal;
  const recentActivities = invoices.slice(0, 5);

  return {
    incomeTotal,
    expenseTotal,
    balance,
    recentActivities,
    invoices,
    loading,
    error,
  };
};
