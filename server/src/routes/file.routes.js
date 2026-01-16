import { Router } from "express";
import multer from "multer";
import authMiddleware from "../middlewares/auth.middleware.js";
import { uploadFile, getAllFiles } from "../controllers/file.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.use(authMiddleware);

router.post("/:projectId", upload.single("file"), uploadFile);
router.get("/:projectId", getAllFiles);

export default router;
