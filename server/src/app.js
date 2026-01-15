import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

/**
 * Global Middlewares
 */
app.use(express.json()); // Parse JSON body


// Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

export default app;
