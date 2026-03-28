const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

// Sert les fichiers du dossier public
app.use(express.static("public"));

let wins = 0;

// 🌐 PAGE PRINCIPALE (fix "Cannot GET /")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 📊 GET wins
app.get("/wins", (req, res) => {
  res.json({ wins });
});

// ➕ ADD win
app.post("/win1", (req, res) => {
  wins += 1;
  res.json({ wins });
});

app.post("/win5", (req, res) => {
  wins += 5;
  res.json({ wins });
});

app.post("/win25", (req, res) => {
  wins += 25;
  res.json({ wins });
});

app.post("/win75", (req, res) => {
  wins += 75;
  res.json({ wins });
});

// NEGATIF

app.post("/lose5", (req, res) => {
  wins -= 5;
  res.json({ wins });
});

app.post("/lose25", (req, res) => {
  wins -= 25;
  res.json({ wins });
});

app.post("/lose75", (req, res) => {
  wins -= 75;
  res.json({ wins });
});

// 🔄 RESET
app.post("/reset", (req, res) => {
  wins = 0;
  res.json({ wins });
});

// 🚀 Render utilise PORT dynamique
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur running on port " + PORT);
});
