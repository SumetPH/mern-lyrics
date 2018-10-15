const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WordSchema = new Schema({
   songId: String,
   word: String,
   wordType: String,
   translate: String,
   image: String,
   created: {
      type: Date,
      default: new Date()
   }
})

module.exports = mongoose.model('word', WordSchema)
