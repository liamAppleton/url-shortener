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

router.get("/:id", async (req, res) => {
  const url = await Urls.findById(req.params.id);

  res.send(url);
});

router.post("/", async (req, res) => {
  try {
    let exisitingUrl = await Urls.findOne({ link: req.body.link });

    // if url does not exist, it is added to DB with a new key
    if (!exisitingUrl) {
      const key = keyGenerator();
      const shortenedUrl = "shortylinks.io/" + key;
      exisitingUrl = new Urls({
        ...exisitingUrl,
        link: req.body.link,
        shortUrl: shortenedUrl,
        key: key,
      });

      exisitingUrl = await exisitingUrl.save();
      return res.send("https://" + exisitingUrl.shortUrl);
    } else {
      return res.send("https://" + exisitingUrl.shortUrl);
    }
  } catch (error) {
    // update this block to account for invalid URLS etc...
    res.status(404).send(error.message);
  }
});

router.get("/:shorty", async (req, res) => {
  try {
    const url = await Urls.findOne({ key: req.params.shorty });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    return res.redirect(url.link);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
