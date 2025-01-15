const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { urlGenerator } = require("./utils");

const Urls = mongoose.model(
  "Urls",
  mongoose.Schema({
    link: { type: String, required: true },
    shortUrl: String,
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
      const shortenedUrl = urlGenerator();
      exisitingUrl = new Urls({
        ...exisitingUrl,
        link: req.body.link,
        shortUrl: shortenedUrl,
      });

      exisitingUrl = await exisitingUrl.save();
      return res.send(exisitingUrl);
    } else {
      return res.send(exisitingUrl.shortUrl);
    }
  } catch (error) {
    // update this block to account for invalid URLS etc...
    res.status(404).send(error.message);
  }
});

module.exports = router;
