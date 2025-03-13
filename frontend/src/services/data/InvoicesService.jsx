import api from "./Api";

export const createInvoice = (data) => api.post("/invoices", data);

export const getIncomeInvoices = () => api.get("/invoices/income");

export const getExpenseInvoices = () => api.get("/invoices/expense");

export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);

export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
