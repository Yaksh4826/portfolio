import About from "../models/aboutModel.js";

// Get about section (there should only be one)
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    // If no about exists, return default structure
    if (!about) {
      about = {
        name: "Yaksh Patel",
        bio: "I am a web developer focused on building clean, simple experiences with React. I enjoy turning ideas into functional, minimal interfaces and learning by doing.",
        profileImage: "",
        resumeUrl: "",
        techStack: [],
      };
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update about section (upsert - only one document)
export const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      { ...req.body, updated: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete about section
export const deleteAbout = async (req, res) => {
  try {
    await About.deleteMany();
    res.json({ message: "About section deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

