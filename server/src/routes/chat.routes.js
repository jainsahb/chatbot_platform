import { Router } from "express";
import { chatWithAgent } from "../controllers/chat.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/:projectId", chatWithAgent);

export default router;
