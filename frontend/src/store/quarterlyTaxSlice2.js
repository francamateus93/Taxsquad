import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/data/Api";

// CREATE Quarterly Tax Document
export const createQuarterlyDoc = createAsyncThunk(
  "quarterlyTax/create",
  async ({ userId, data }, thunkAPI) => {
    try {
      const res = await api.post(
        `/quarterly_tax/new-quarterly/${userId}`,
        data
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// FETCH Quarterly Documents
export const fetchQuarterlyDocs = createAsyncThunk(
  "quarterlyTax/fetchAll",
  async (userId, thunkAPI) => {
    try {
      const res = await api.get(`/quarterly_tax/new-quarterly/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const quarterlyTaxSlice = createSlice({
  name: "quarterlyTax",
  initialState: {
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuarterlyDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuarterlyDoc.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(createQuarterlyDoc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuarterlyDocs.fulfilled, (state, action) => {
        state.documents = action.payload;
      });
  },
});

export default quarterlyTaxSlice.reducer;
