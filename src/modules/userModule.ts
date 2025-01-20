import mongoose, { Schema, Document } from "mongoose";
import { Repository } from "../types/repository";

const userSchema = new Schema(
  {
    userId: { type: String, required: true },
    favorites: [{ type: Schema.Types.Mixed, required: true }],
  },
  { timestamps: true }
);

const User = mongoose.model<Document & { id: number; favorites: Repository[] }>(
  "users",
  userSchema
);

export default User;
