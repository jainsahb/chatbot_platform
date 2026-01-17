import express from "express";
// import 'dotenv/config';
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import promptRoutes from "./routes/prompt.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import fileRoutes from "./routes/file.routes.js";

const app = express();

/**
 * Global Middlewares
 */
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/prompts", promptRoutes);
app.use("/chat", chatRoutes);
app.use("/files", fileRoutes);

export default app;
