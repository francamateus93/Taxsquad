import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import invoicesReducer from "./slices/invoicesSlice";
import DocumentsReducer from "./slices/documentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
    documents: DocumentsReducer,
  },
});
