import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/data/Api";

export const fetchDocumentsByType = createAsyncThunk(
  "documents/fetchByType",
  async ({ userId, type }, thunkAPI) => {
    try {
      const response = await api.get(
        `/documents/users/${userId}/documents?type=${type}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const fetchDocumentById = createAsyncThunk(
  "documents/fetchById",
  async ({ userId, documentId }, thunkAPI) => {
    try {
      const response = await api.get(
        `/documents/users/${userId}/documents/${documentId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const createDocument = createAsyncThunk(
  "documents/create",
  async ({ userId, documentData }, thunkAPI) => {
    try {
      const response = await api.post(
        `/documents/users/${userId}/documents`,
        documentData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const updateDocument = createAsyncThunk(
  "documents/update",
  async ({ userId, documentId, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(
        `/documents/users/${userId}/documents/${documentId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async ({ userId, documentId }, thunkAPI) => {
    try {
      await api.delete(`/documents/users/${userId}/documents/${documentId}`);
      return documentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    currentDocument: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentDocument: (state) => {
      state.currentDocument = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocumentsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.currentDocument = action.payload;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.documents.unshift(action.payload);
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.documents = state.documents.map((doc) =>
          doc.id === action.payload.documentId ? action.payload : doc
        );
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload
        );
      });
  },
});

export const { clearCurrentDocument } = documentsSlice.actions;
export default documentsSlice.reducer;
