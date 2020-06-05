const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questionsQuantity: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Survey", surveySchema);
