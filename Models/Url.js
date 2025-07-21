import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCode: String,
  mainurl: String,
});

export const Url = mongoose.model("shortURL", urlSchema);
