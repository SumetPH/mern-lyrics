const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
   details: Object,
   lyrics: String,
   created: {
      type: Date,
      default: new Date()
   }
})

module.exports = mongoose.model('song', SongSchema)
