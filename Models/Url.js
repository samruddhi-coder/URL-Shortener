import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
  shortCode: String,
  mainurl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Url = mongoose.model("shorturldata", urlSchema);
