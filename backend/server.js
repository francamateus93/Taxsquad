import { createPool } from "mysql2/promise";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import documentsRoutes from "./routes/documentsRoutes";
import invoicesRoutes from "./routes/invoicesRoutes";
import usersRoutes from "./routes/usersRoutes";

dotenv.config();
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

export const db = createPool({
  host: process.env.MYSQL_DB_HOST || "localhost",
  user: process.env.MYSQL_DB_USER || "root",
  password: process.env.MYSQL_DB_PASS || "franca3633",
  database: process.env.MYSQL_DB_NAME || "taxsquad",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// app.use("/users", usersRoutes);
// app.use("/invoice", invoiceRoutes);
// app.use("/documents", documentsRoutes);

app.get("/", async (_req, res) => {
  res.json({ message: "Service is running" });
});

// Initialize server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Service is running on http://localhost:${PORT}`);
});

export default app;
