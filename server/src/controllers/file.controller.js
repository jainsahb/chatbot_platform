import Project from "../models/project.model.js";
import File from "../models/file.model.js";
import { uploadFileToOpenAI } from "../services/openaiFile.service.js";
import { readFileContent } from "../utils/fileReader.js";
import fs from "fs";

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

    // Extract text from file
    let extractedText = "";
    if (req.file?.path) {
      try {
        extractedText = readFileContent(req.file.path);
      } catch (e) {
        extractedText = "";
      }
    }

    // Save in DB
    const savedFile = await File.create({
      projectId: projectId,
      openaiFileId: fileId,
      filename,
      content: extractedText,
    });

    // Clean up uploaded file
    if (req.file?.path) {
      fs.unlink(req.file.path, () => {});
    }

    res.status(201).json({
      message: "File uploaded successfully",
      file: savedFile,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFiles = async (req, res) => {
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

    const files = await File.find({ projectId }).select("-content");
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
