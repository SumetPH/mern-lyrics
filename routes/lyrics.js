const router = require('express').Router()
const Song = require('../models/Song')

// update lyrics
router.put('/lyrics', (req, res) => {
   const { _id, lyrics } = req.body
   Song.findById(_id).exec((err, doc) => {
      if (err || doc === null) {
         return res.json({ msg: 'Error', res: err })
      }
      doc.lyrics = lyrics
      doc.save(err => {
         if (err) {
            return res.json({ msg: 'Error', res: err })
         }
         return res.json({ msg: 'Success' })
      })
   })
})

module.exports = router
