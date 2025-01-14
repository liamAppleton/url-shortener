const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const randomKeyGenerator = require("../helper-functions/helpers");

const urlSignature = "shortylinks.io/"; // figure out how to return a new link, add checking logic to see if link is already in db

const Urls = mongoose.model(
  "Urls",
  mongoose.Schema({
    link: { type: String, required: true },
    key: String,
  })
);

router.get("/:id", async (req, res) => {
  const url = await Urls.findById(req.params.id);

  res.send(url);
});

router.post("/", async (req, res) => {
  let url = new Urls({ link: req.body.link });
  url = await url.save();

  res.send(url);
});

module.exports = router;
