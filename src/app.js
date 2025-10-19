import express from "express";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

const allowedOrigins = [
  "https://portfolio-frontend-aski.vercel.app", // your Vercel frontend
  "http://localhost:5173", // local dev (Vite default)
  "http://localhost:3000"  // optional (React dev server)
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // only needed if using cookies/auth
  })
);

// Parse incoming JSON
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/projects", projectRoutes);
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => res.send("Portfolio API is running"));

export default app;