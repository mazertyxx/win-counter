const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let wins = 0;

// GET wins
app.get("/wins", (req, res) => {
  res.json({ wins });
});

// ADD win
app.post("/win", (req, res) => {
  wins++;
  res.json({ wins });
});

// RESET
app.post("/reset", (req, res) => {
  wins = 0;
  res.json({ wins });
});

app.listen(3000, () => {
  console.log("Serveur running on port 3000");
});