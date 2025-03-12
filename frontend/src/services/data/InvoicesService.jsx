import api from "./Api";

// Criar invoice
export const createInvoice = (data) => api.post("/invoices", data);

// Obter invoices income
export const getIncomeInvoices = () => api.get("/invoices/income");

// Obter invoices expense
export const getExpenseInvoices = () => api.get("/invoices/expense");

// Atualizar invoice
export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);

// Deletar invoice
export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
