const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { keyGenerator } = require("./utils");

const Urls = mongoose.model(
  "Urls",
  mongoose.Schema({
    link: { type: String, required: true },
    shortUrl: String,
    key: String,
  })
);

router.get("/", async (req, res) => {
  const urls = await Urls.find();
  res.send(urls);
});

// router.get("/:key", async (req, res) => {
//   const url = await Urls.findOne({ key: req.params.key });

//   res.send(url);
// });

router.post("/", async (req, res) => {
  try {
    let exisitingUrl = await Urls.findOne({ link: req.body.link });

    // if url does not exist, it is added to DB with a new key
    if (!exisitingUrl) {
      const key = keyGenerator();
      const shortenedUrl = "http://localhost:3000/api/" + key;
      exisitingUrl = new Urls({
        ...exisitingUrl,
        link: req.body.link,
        shortUrl: shortenedUrl,
        key: key,
      });

      exisitingUrl = await exisitingUrl.save();
      return res.send(exisitingUrl.shortUrl);
    } else {
      return res.send(exisitingUrl.shortUrl);
    }
  } catch (error) {
    // update this block to account for invalid URLS etc...
    res.status(404).send(error.message);
  }
});

router.get("/:key", async (req, res) => {
  const url = await Urls.findOne({ key: req.params.key });

  res.redirect(url.link);
});

module.exports = router;
