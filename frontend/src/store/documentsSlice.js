import { createSlice } from "@reduxjs/toolkit";

const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.documents = [];
    },
  },
});

export const { setDocuments, setLoading, setError } = documentsSlice.actions;
export default documentsSlice.reducer;
