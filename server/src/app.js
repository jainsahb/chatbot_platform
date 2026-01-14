import express from "express";
import healthRoutes from "./routes/health.routes.js";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json()); // Parse JSON body


// Routes
app.use("/health", healthRoutes);

export default app;
