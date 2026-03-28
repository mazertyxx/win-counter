const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// =====================
// 🎮 GAME STATE
// =====================
let wins = 0;
let goal = 100;

let multiplier = 1;
let multiplierEnd = 0;

// =====================
// 🌐 BASIC ROUTES
// =====================

// GET HUD DATA
app.get("/wins", (req, res) => {
  res.json({
    wins,
    goal,
    multiplier,
    multiplierEnd
  });
});

// =====================
// ➕ WIN SYSTEM
// =====================

function addWin(amount) {
  if (Date.now() > multiplierEnd) {
    multiplier = 1;
    multiplierEnd = 0;
  }

  wins += amount * multiplier;

  if (wins >= goal) {
    wins = 0;
  }
}

// +1
app.post("/win1", (req, res) => {
  addWin(1);
  res.json({ wins });
});

// +5
app.post("/win5", (req, res) => {
  addWin(5);
  res.json({ wins });
});

// +25
app.post("/win25", (req, res) => {
  addWin(25);
  res.json({ wins });
});

// +75
app.post("/win75", (req, res) => {
  addWin(75);
  res.json({ wins });
});

// =====================
// ➖ LOSE SYSTEM
// =====================

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

// =====================
// 🔄 RESET
// =====================

app.post("/reset", (req, res) => {
  wins = 0;
  res.json({ wins });
});

// =====================
// 🎯 GOAL SYSTEM
// =====================

app.post("/goal", (req, res) => {
  const { newGoal } = req.body;
  goal = parseInt(newGoal);
  res.json({ goal });
});

// =====================
// 💥 MULTIPLIER SYSTEM
// =====================

app.post("/multiplier", (req, res) => {
  const { value } = req.body;

  multiplier = parseInt(value);
  multiplierEnd = Date.now() + 5 * 60 * 1000;

  res.json({ multiplier, multiplierEnd });
});

// =====================
// 🚀 SERVER
// =====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Serveur running on port " + PORT);
});

const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
