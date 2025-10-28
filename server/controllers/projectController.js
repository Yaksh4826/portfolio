import Project from "../models/projectModel.js";

export const getProjects = async (req, res) => res.json(await Project.find());
export const getProjectById = async (req, res) => res.json(await Project.findById(req.params.id));
export const createProject = async (req, res) => res.status(201).json(await Project.create(req.body));
export const updateProject = async (req, res) =>
  res.json(await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};
export const deleteAllProjects = async (req, res) => {
  await Project.deleteMany();
  res.json({ message: "All projects deleted" });
};
