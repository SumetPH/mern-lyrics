const router = require("express").Router();
const Song = require("../models/Song");

// get song
router.get("/song", (req, res) => {
  Song.find()
    .sort({ created: -1 })
    .exec((err, doc) => {
      if (err) {
        return res.json({ msg: "Error", res: err });
      }
      return res.json({ msg: "Success", doc });
    });
});

// get song by id
router.get("/song/:id", (req, res) => {
  const { id } = req.params;
  Song.findById(id).exec((err, doc) => {
    if (err) {
      return res.json({ msg: "Error", res: err });
    }
    return res.json({
      msg: "Success",
      song: doc,
      lyrics: doc.lyrics,
      youtubeId: doc.details.id
    });
  });
});

// add song
router.post("/song", (req, res) => {
  const { details, created } = req.body;
  const newSong = new Song({ details, created });
  newSong.save(err => {
    if (err) {
      return res.json({ msg: "Error", res: err });
    }
    return res.json({ msg: "Success" });
  });
});

module.exports = router;
