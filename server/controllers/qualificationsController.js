import Qualification from "../models/qualificationsModel.js";

export const getQualifications = async (req, res) => res.json(await Qualification.find());
export const getQualificationById = async (req, res) => res.json(await Qualification.findById(req.params.id));
export const createQualification = async (req, res) => res.status(201).json(await Qualification.create(req.body));
export const updateQualification = async (req, res) =>
  res.json(await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteQualification = async (req, res) => {
  await Qualification.findByIdAndDelete(req.params.id);
  res.json({ message: "Qualification deleted" });
};
export const deleteAllQualifications = async (req, res) => {
  await Qualification.deleteMany();
  res.json({ message: "All qualifications deleted" });
};
