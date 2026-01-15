import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addPrompt, getPrompts } from "../controllers/prompt.controller.js";

const router = Router();

router.use(authMiddleware);

router.post("/:projectId", addPrompt);
router.get("/:projectId", getPrompts);

export default router;
