const FileModel = require("../models/FileModel");

const uploadFile = async (req, res) => {
  try {
    const newFileUpload = {
      name: req.files[0].originalname,
      url: req.files[0].path,
      filename: req.files[0].filename,
    };
    res.status(200).send({ ...newFileUpload });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
};
module.exports = {
  uploadFile,
};
