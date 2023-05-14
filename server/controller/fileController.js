const File = require("../models/FileModel");
const { getVideoDurationInSeconds } = require("get-video-duration");
const { find } = require("../models/FileModel");
const uploadFile = async (req, res) => {
    try {
        const newFileUpload = {
            name: req.files[0].originalname,
            url: req.files[0].path,
            filename: req.files[0].filename,
        };
        getVideoDurationInSeconds(req.files[0].path).then((duration) => {
            res.status(200).send({ ...newFileUpload, duration: duration });
        });
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};

const uploadVideoStock = async (req, res) => {
    try {
        const newFileUpload = {
            name: req.files[0].originalname,
            url: req.files[0].path,
            filename: req.files[0].filename,
        };
        getVideoDurationInSeconds(req.files[0].path).then((duration) => {
            const newFile = new File({ ...newFileUpload, duration: duration });
            newFile.save().then((savedFile) => {
                res.status(200).send(savedFile);
            });
        });
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};

const getAllFiles = async (req, res) => {
    try {
        const files = await File.find({});
        res.status(200).send({ data: files });
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};

const getAll = async (req, res) => {
  try {
    const data = FileModel.find({}, function (err, docs) {
      if (!err) {
        res.status(200).send(docs);
      } else {
        throw err;
      }
    });
    // console.log(data.schema.plugins);
  } catch (error) {}
};
module.exports = {
  uploadFile,
  uploadVideoStock,
  getAll,
  getAllFiles
};
