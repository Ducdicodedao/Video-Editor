const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  name: { type: String, required: true },
  source: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
