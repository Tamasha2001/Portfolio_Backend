import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("Portfolio API is running"));
export default app;
