import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "User" },
  status: { type: String, default: "Active" },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: true },
});

// Prevent model overwrite in dev
const User = models.User || model("User", UserSchema);
export default User;
