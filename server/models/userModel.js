import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  created: { type: Date, default: Date.now },
  updated: Date,
});

export default mongoose.model("User", userSchema);
