import Project from "../models/project.model.js";
import File from "../models/file.model.js";
import { uploadFileToOpenAI } from "../services/openaiFile.service.js";

export const uploadFile = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Ownership check
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Upload to OpenAI
    const { fileId, filename } = await uploadFileToOpenAI(
      req.file.path,
      req.file.originalname
    );

    // Save in DB
    const savedFile = await File.create({
      project: projectId,
      openaiFileId: fileId,
      filename,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
