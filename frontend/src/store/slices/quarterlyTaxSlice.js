import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/data/Api";

export const fetchQuarterlyTax = createAsyncThunk(
  "quarterlyTax/fetchAll",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await api.get(`/taxes/users/${userId}/new-quarterly`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const createQuarterlyTax = createAsyncThunk(
  "quarterlyTax/create",
  async ({ userId, quarterlyData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/taxes/users/${userId}/new-quarterly`,
        quarterlyData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const updateQuarterlyTax = createAsyncThunk(
  "quarterlyTax/update",
  async ({ userId, quarterlyId, quarterlyData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/taxes/users/${userId}/new-quarterly/${quarterlyId}`,
        quarterlyData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const deleteQuarterlyTax = createAsyncThunk(
  "quarterlyTax/delete",
  async ({ userId, quarterlyId }, thunkAPI) => {
    try {
      await api.delete(`/taxes/users/${userId}/new-quarterly/${quarterlyId}`);
      return quarterlyId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const quarterlyTaxSlice = createSlice({
  name: "quarterlyTax",
  initialState: {
    quarterlyTax: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuarterlyTax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuarterlyTax.fulfilled, (state, action) => {
        state.quarterlyTax = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchQuarterlyTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuarterlyTax.fulfilled, (state, action) => {
        state.quarterlyTax.unshift(action.payload);
      })
      .addCase(updateQuarterlyTax.fulfilled, (state, action) => {
        state.quarterlyTax = state.quarterlyTax.map((qt) =>
          qt.id === action.payload.id ? action.payload : qt
        );
      })
      .addCase(deleteQuarterlyTax.fulfilled, (state, action) => {
        state.quarterlyTax = state.quarterlyTax.filter(
          (qt) => qt.id !== action.payload
        );
      });
  },
});

export default quarterlyTaxSlice.reducer;
