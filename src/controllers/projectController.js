import Project from "../models/Project.js";

// Get all projects with image data
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    // Convert image buffer to base64 for frontend
    const projectsWithImages = projects.map(project => {
      const projectObj = project.toObject();
      if (project.coverImage && project.coverImage.data) {
        projectObj.coverImage = {
          data: project.coverImage.data.toString('base64'),
          contentType: project.coverImage.contentType,
          filename: project.coverImage.filename
        };
      }
      return projectObj;
    });
    
    res.json(projectsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create project with image
export const createProject = async (req, res) => {
  try {
    const { title, description, repoUrl } = req.body;
    
    let coverImage = null;
    if (req.file) {
      coverImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname
      };
    }

    const project = new Project({ 
      title, 
      description, 
      repoUrl, 
      coverImage 
    });
    
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { title, description, repoUrl } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;
    project.repoUrl = repoUrl || project.repoUrl;

    // Update coverImage if a new file is uploaded
    if (req.file) {
      project.coverImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname
      };
    }

    const updated = await project.save();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};