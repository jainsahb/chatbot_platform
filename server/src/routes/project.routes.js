import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createProject,
  getMyProjects,
  getProjectById
} from "../controllers/project.controller.js";

const router = Router();

router.use(authMiddleware); // Protect all routes below

router.post("/", createProject);
router.get("/", getMyProjects);
router.get("/:id", getProjectById);

export default router;
