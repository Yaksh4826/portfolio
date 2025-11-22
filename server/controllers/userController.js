import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const getUsers = async (req, res) => res.json(await User.find());
export const getUserById = async (req, res) => res.json(await User.findById(req.params.id));

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role: "user" });
  await user.save();
  res.status(201).json(user);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "1h" });
  res.json({ token });
};

export const signout = async (req, res) => {
  // For JWT stateless auth, client just discards token. Provide success response.
  res.json({ message: "Signed out" });
};

export const updateUser = async (req, res) => {
  const { password, ...rest } = req.body;
  const update = { ...rest };
  if (password) update.password = await bcrypt.hash(password, 10);
  const updated = await User.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(updated);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

export const deleteAllUsers = async (req, res) => {
  await User.deleteMany();
  res.json({ message: "All users deleted" });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("_id name email role created updated");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};
