import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/data/Api";

export const fetchAnnualTax = createAsyncThunk(
  "annualTax/fetchAll",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await api.get(`/taxes/users/${userId}/new-annual`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const createAnnualTax = createAsyncThunk(
  "annualTax/create",
  async ({ userId, annualData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/taxes/users/${userId}/new-annual`,
        annualData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const updateAnnualTax = createAsyncThunk(
  "annualTax/update",
  async ({ userId, annualId, annualData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/taxes/users/${userId}/new-annual/${annualId}`,
        annualData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const deleteAnnualTax = createAsyncThunk(
  "annualTax/delete",
  async ({ userId, annualId }, thunkAPI) => {
    try {
      await api.delete(`/taxes/users/${userId}/new-annual/${annualId}`);
      return annualId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const annualTaxSlice = createSlice({
  name: "annualTax",
  initialState: {
    annualTax: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnualTax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnualTax.fulfilled, (state, action) => {
        state.annualTax = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAnnualTax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAnnualTax.fulfilled, (state, action) => {
        state.annualTax.unshift(action.payload);
      })
      .addCase(updateAnnualTax.fulfilled, (state, action) => {
        state.annualTax = state.annualTax.map((at) =>
          at.id === action.payload.id ? action.payload : at
        );
      })
      .addCase(deleteAnnualTax.fulfilled, (state, action) => {
        state.annualTax = state.annualTax.filter(
          (at) => at.id !== action.payload
        );
      });
  },
});

export default annualTaxSlice.reducer;
