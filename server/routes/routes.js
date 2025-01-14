const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const app = express();

const films = [
  { id: 1, title: "film1" },
  { id: 2, title: "film2" },
  { id: 3, title: "film3" },
];

router.get("/api", (req, res) => {
  res.send(films);
  console.log(films);
});

router.get("/api/:id", (req, res) => {
  const film = films.find((f) => f.id === parseInt(req.params.id));
  if (!film)
    return res.status(404).send(`Film with ID:${req.params.id} not found.`);
  res.send(film);
});

module.exports = router;
