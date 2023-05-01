const FileModel = require("../models/FileModel");

const uploadFile = async (req, res) => {
  try {
    const newFileUpload = new FileModel({
      ownerId: req.user._id,
      name: req.files[0].originalname,
      source: req.files[0].path,
      filename: req.files[0].filename,
    });
    await newFileUpload.save();
    res.status(200).send({ newFileUpload });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
};
module.exports = {
  uploadFile,
};
