import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    gender: { type: String },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const user = mongoose.models.user || mongoose.model("user", UserSchema);

export default user;
