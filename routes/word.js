const router = require("express").Router();
const Song = require("../models/Song");
const Word = require("../models/Word");

// load words
router.get("/word", (req, res) => {
  Word.find().exec((err, words) => {
    return res.json(words);
  });
});

// load word by song
router.get("/word/:id", (req, res) => {
  const { id } = req.params;
  Word.find({ songId: id })
    .sort({ created: 1 })
    .exec((err, words) => {
      return res.json({ msg: "Success", words });
    });
});

// add vocab
router.post("/word", (req, res) => {
  const {
    songId,
    wordType,
    word,
    translate,
    sentence,
    image,
    created
  } = req.body;
  const newWord = new Word({
    songId,
    wordType,
    word,
    translate,
    sentence,
    image,
    created
  });

  newWord.save(err => {
    if (err) {
      return res.json({ msg: "Error", res: err });
    }
    return res.json({ msg: "Success" });
  });
});

// update vocab
router.put("/word", (req, res) => {
  const { wordId, word, wordType, translate, sentence, image } = req.body;
  Word.findByIdAndUpdate(
    wordId,
    { word, wordType, translate, sentence, image },
    err => {
      if (err) {
        return res.json({ msg: "Error", res: err });
      }
      return res.json({ msg: "Success" });
    }
  );
});

// delete vocab
router.delete("/word", (req, res) => {
  const { idWord } = req.body;
  Word.findByIdAndRemove(idWord, err => {
    if (err) {
      return res.json({ msg: "Error", res: err });
    }
    return res.json({ msg: "Success" });
  });
});

module.exports = router;
