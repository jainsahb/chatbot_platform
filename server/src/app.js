import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json()); // Parse JSON body


// Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);

export default app;
