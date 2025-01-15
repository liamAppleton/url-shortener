const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { randomKeyGenerator } = require("./utils");
const urlSignature = "shortylinks.io/"; // figure out how to return a new link, add checking logic to see if link is already in db

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
  const urlCheck = await Urls.findById(req.params.id);
  let url;

  // if url does not exist, it is added to DB with a new key
  if (!urlCheck) {
    const key = randomKeyGenerator();
    const shortenedUrl = urlSignature + key;
    url = new Urls({
      ...url,
      link: req.body.link,
      shortUrl: shortenedUrl,
      key: key,
    });
    url = await url.save();
  }

  res.send(url);
});

module.exports = router;
