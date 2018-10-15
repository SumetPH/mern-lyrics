const express = require('express')
const server = express()
const port = 4000

const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const youtubeSearch = require('youtube-search')

const Song = require('./models/Song')
const Word = require('./models/Word')

const song = require('./routes/song')
const lyrics = require('./routes/lyrics')
const word = require('./routes/word')

server.use(cors())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

mongoose
   .connect(
      'mongodb://my-lyrics:my-lyrics1@ds145752.mlab.com:45752/my-lyrics',
      { useNewUrlParser: true }
   )
   .then(() => console.log('mongoDB Connected.'))

// search
server.post('/youtube', (req, res) => {
   youtubeSearch(
      req.body.search,
      {
         maxResults: req.body.length,
         key: 'AIzaSyDF54W_vVCtRpHaGdLRcBVH9vb4m7R9OQI'
      },
      (err, result) => {
         res.json(result)
      }
   )
})

server.use(song)
server.use(lyrics)
server.use(word)

server.listen(port, err => {
   if (err) throw err
   console.log(`> Ready on http://localhost:${port}`)
})
