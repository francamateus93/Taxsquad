import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/data/Api";

// Async Thunks
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/login", credentials);
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, thunkAPI) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const response = await api.delete(`/users/${userId}`);
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
