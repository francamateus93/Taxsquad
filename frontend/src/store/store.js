import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import invoicesReducer from "./invoicesSlice";
import DocumentsReducer from "./documentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoicesReducer,
    documents: DocumentsReducer,
  },
});
