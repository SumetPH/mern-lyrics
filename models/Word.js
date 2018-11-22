const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  songId: String,
  word: String,
  wordType: String,
  translate: String,
  sentence: String,
  image: String,
  created: Date
});

module.exports = mongoose.model("word", WordSchema);
