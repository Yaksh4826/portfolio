import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  created: { type: Date, default: Date.now },
  updated: Date,
});

export default mongoose.model("User", userSchema);
