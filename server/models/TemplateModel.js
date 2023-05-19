const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
    video: Number,
    image: Number,
    text: Number,
    api: String,
});
const templateSchema = new mongoose.Schema({
    name: { type: String },
    url: { type: String },
    type: String,
    option: optionSchema,
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
