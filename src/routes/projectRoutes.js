import express from "express";
import multer from "multer";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Routes
router.get("/", getProjects);
router.post("/", upload.single("coverImage"), createProject);
router.put("/:id", upload.single("coverImage"), updateProject);
router.delete("/:id", deleteProject);

export default router;