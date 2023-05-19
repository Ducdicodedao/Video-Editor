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
        const filetype = req.files[0].mimetype.split("/");
        console.log(filetype);
        if (filetype[0] !== "image") {
            getVideoDurationInSeconds(req.files[0].path).then((duration) => {
                res.status(200).send({ ...newFileUpload, duration: duration });
            });
        } else {
            res.status(200).send({ ...newFileUpload });
        }
    } catch (error) {
        res.status(401).send({ msg: error.message });
    }
};

const uploadFileStock = async (req, res) => {
    try {
        const newFileUpload = {
            name: req.files[0].originalname,
            url: req.files[0].path,
            filename: req.files[0].filename,
        };
        const type = req.files[0].mimetype.split("/")[0];
        getVideoDurationInSeconds(req.files[0].path).then((duration) => {
            const newFile = new File({
                ...newFileUpload,
                duration: duration,
                type: type,
            });
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

const getAllVideo = async (req, res) => {
    try {
        const data = File.find({ type: "video" }, function (err, docs) {
            if (!err) {
                res.status(200).send(docs);
            } else {
                throw err;
            }
        });
        // console.log(data.schema.plugins);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};
const getAllAudio = async (req, res) => {
    try {
        const data = File.find({ type: "audio" }, function (err, docs) {
            if (!err) {
                res.status(200).send(docs);
            } else {
                throw err;
            }
        });
        // console.log(data.schema.plugins);
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};
module.exports = {
    uploadFile,
    uploadFileStock,
    getAllVideo,
    getAllFiles,
    getAllAudio,
};
