import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: String, default: "" }, // URL to profile image
  resumeUrl: { type: String, default: "" }, // URL to resume PDF
  techStack: [{ 
    name: String,
    icon: String // URL or icon identifier
  }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("About", aboutSchema);

