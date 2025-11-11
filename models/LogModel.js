import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  level: Number,
  msg: String,
  time: Date,
  name: String,
  hostname: String,
  pid: Number,
  v: Number,
  extra: Object,
});

export const LogModel = mongoose.model("Log", LogSchema);
