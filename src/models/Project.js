import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  repoUrl: String,
  coverImage: {
    data: Buffer,
    contentType: String,
    filename: String
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", ProjectSchema);