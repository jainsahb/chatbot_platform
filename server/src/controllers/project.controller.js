import Project from "../models/project.model.js";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    if(!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const project = await Project.create({
      name,
      description,
      userId: req.user.userId
    });

    res.status(201).json({ message: "Project created successfully", project });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};

// Get all projects
export const getMyProjects = async(req, res) => {
  try {
    const userId = req.user.userId;
    const projects = await Project.find({ userId: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ projects });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get projects" });
  }
};

// Get project by id
export const getProjectById = async(req, res) => {
  const projectId = req.params.id;
  const userId = req.user.userId;

  const project = await Project.findOne({ 
    _id: projectId, 
    userId: userId 
  });

  if(!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.status(200).json({ project });
};
