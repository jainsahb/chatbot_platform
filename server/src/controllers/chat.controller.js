import Project from "../models/project.model.js";
import Prompt from "../models/prompt.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";

// Chat with Agent
export const chatWithAgent = async (req, res) => {
  try {
    const { message } = req.body; 
    const { projectId } = req.params;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const project = await Project.findOne({
      _id: projectId,
      userId: req.user.userId,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // fetch all prompts for the project (agent instructions)
    const prompts = await Prompt.find({ projectId });

    //Build Gemini Response
    const messages = [];

    // Add system instructions from prompts
    prompts.forEach((prompt) => {
      messages.push({
        role: "system",
        content: prompt.content,
      });
    });

    // Add user message
    messages.push({
      role: "user",
      content: message,
    });

    const aiResponse = await generateGeminiResponse(messages);
    res.status(200).json({ reply: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
