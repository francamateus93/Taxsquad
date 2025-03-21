import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchInvoicesByType = createAsyncThunk(
  "invoices/fetchInvoicesByType",
  async ({ userId, type }, thunkAPI) => {
    try {
      const response = await api.get(
        `/invoices/users/${userId}/invoices?type=${type}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchIncomeInvoices = createAsyncThunk(
  "invoices/fetchIncomeInvoices",
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(
        `/invoices/users/${userId}/invoices/income`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchExpenseInvoices = createAsyncThunk(
  "invoices/fetchExpenseInvoices",
  async (userId, thunkAPI) => {
    try {
      const response = await api.get(
        `/invoices/users/${userId}/invoices/expense`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async ({ userId, invoiceData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/invoices/users/${userId}/invoices`,
        invoiceData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async ({ invoiceId, invoiceData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/invoices/invoices/${invoiceId}`,
        invoiceData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (invoiceId, thunkAPI) => {
    try {
      await api.delete(`/invoices/invoices/${invoiceId}`);
      return invoiceId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoicesByType.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoicesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchIncomeInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })

      .addCase(fetchExpenseInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      })

      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices.unshift(action.payload);
      })

      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.map((inv) =>
          inv.id === action.payload.invoiceId ? action.payload : inv
        );
      })

      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (inv) => inv.id !== action.payload
        );
      });
  },
});

export default invoicesSlice.reducer;
