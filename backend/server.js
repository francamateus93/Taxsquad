import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import documentsRoutes from "./routes/documentsRoutes.js";
import invoicesRoutes from "./routes/invoicesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import taxesRoutes from "./routes/taxesRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/users", usersRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/documents", documentsRoutes);
app.use("/taxes", taxesRoutes);

app.get("/", async (_req, res) => {
  res.json({ message: "Service is running" });
});

// Initialize server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Service is running on http://localhost:${PORT}`);
});

export default app;
