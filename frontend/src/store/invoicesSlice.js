import { createSlice } from "@reduxjs/toolkit";
// import { setLoading } from "./authSlice";

const initialState = {
  invoices: [],
  loading: false,
  error: null,
};

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    addInvoice: (state, action) => {
      state.invoices.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const updated = action.payload;
      const idx = state.invoices.findIndex((inv) => inv.id === updated.id);
      if (idx !== -1) {
        state.invoices[idx] = updated;
      }
    },
    removeInvoice: (state, action) => {
      const id = action.payload;
      state.invoices = state.invoices.filter((inv) => inv.id !== id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setInvoices,
  addInvoice,
  updateInvoice,
  removeInvoice,
  setLoading,
  setError,
} = invoicesSlice.actions;

export default invoicesSlice.reducer;
