require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

const port = process.env.PORT || 3000;

const connectMongoose = async () => {
  const dbPassword = process.env.PASSWORD;
  try {
    await mongoose.connect(
      `mongodb+srv://shortenerAdmin:${dbPassword}@cluster0.fi5le.mongodb.net/urlshortener?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Mongoose called...");

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log("Failed to connect" + error.message);
  }
};

connectMongoose();
