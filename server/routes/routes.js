const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Urls = mongoose.model(
  "Urls",
  mongoose.Schema({
    title: String,
  })
);

const films = [
  { id: 1, title: "film1" },
  { id: 2, title: "film2" },
  { id: 3, title: "film3" },
];

router.get("/:id", async (req, res) => {
  const film = await Urls.findById(req.params.id);

  if (!film)
    return res.status(404).send(`Film with ID:${req.params.id} not found.`);
  res.send({ ...film, director: "director" });
});

router.post("/", async (req, res) => {
  let film = new Urls({ title: req.body.title });
  film = await film.save();

  res.send(film);
});

module.exports = router;
