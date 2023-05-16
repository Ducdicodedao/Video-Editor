const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  filename: { type: String },
  duration: { type: String },
  type: { type: String },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
