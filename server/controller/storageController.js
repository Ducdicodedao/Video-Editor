const storageModel = require("../models/Storage");

const StoreVideo = async (req, res) => {
  try {
    const result = new storageModel({
      name: req.body.name,
      duration: req.body.duration,
      url: req.body.url,
      ownerId: req.body.ownerId,
    });
    await result.save();
    res.status(200).send({
      result,
    });
  } catch (error) {
    res.status(401).send({
      msg: error.message,
    });
  }
};

const ShowVideoStorage = async (req, res) => {
  try {
    console.log(req.body);
    const data = storageModel.find(
      { ownerId: req.body.id },
      function (err, docs) {
        if (!err) {
          res.status(200).send(docs);
        } else {
          throw err;
        }
      }
    );
    // console.log(data.schema.plugins);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
module.exports = {
  StoreVideo,
  ShowVideoStorage,
};
