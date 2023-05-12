const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
  duration: { type: String, require: true },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
