const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  duration: { type: String },
  ownerId: { type: String },
});

const Storage = mongoose.model("Storage", storageSchema);

module.exports = Storage;
