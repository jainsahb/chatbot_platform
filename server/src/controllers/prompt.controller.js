import Project from "../models/project.model.js";
import Prompt from "../models/prompt.model.js";

// Add prompt to a project
export const addPrompt = async (req, res) => {
  try {
    const { content } = req.body;
    const { projectId } = req.params;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Ensure project exists AND belongs to user
    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Create prompt
    const prompt = await Prompt.create({
      projectId: project._id,
      content,
    });

    return res
      .status(201)
      .json({ message: "Prompt added successfully", prompt });
  } catch (error) {
    console.error("Error adding prompt:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get Prompts for a project
export const getPrompts = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const prompts = await Prompt.find({ projectId: project._id }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json({ message: "Prompts fetched successfully", prompts });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
