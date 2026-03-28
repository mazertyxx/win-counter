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
// 🌐 GET HUD DATA
// =====================

app.get("/wins", (req, res) => {
  res.json({
    wins,
    goal,
    multiplier,
    multiplierEnd
  });
});

// =====================
// 🧠 SAFE WIN FUNCTION
// =====================

function addWin(amount) {
  if (!Number.isFinite(wins)) wins = 0;
  if (!Number.isFinite(multiplier)) multiplier = 1;

  // stop multiplier if expired
  if (Date.now() > multiplierEnd) {
    multiplier = 1;
    multiplierEnd = 0;
  }

  wins += amount * multiplier;
}

// =====================
// ➕ WINS
// =====================

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
// ➖ LOSSES
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
// 🔄 RESET (MANUEL UNIQUEMENT)
// =====================

app.post("/reset", (req, res) => {
  wins = 0;
  res.json({ wins });
});

// =====================
// 🎯 OBJECTIVE (NO AUTO RESET)
// =====================

app.post("/goal", (req, res) => {
  const { newGoal } = req.body;

  if (Number.isFinite(Number(newGoal))) {
    goal = Number(newGoal);
  }

  res.json({ goal });
});

// =====================
// 💥 MULTIPLIER (5 MIN)
// =====================

app.post("/multiplier", (req, res) => {
  let value = Number(req.body?.value);

  if (!Number.isFinite(value) || value <= 0) {
    value = 1;
  }

  multiplier = value;
  multiplierEnd = Date.now() + 5 * 60 * 1000;

  res.json({
    multiplier,
    multiplierEnd
  });
});

// =====================
// 🚀 SERVER START
// =====================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Serveur running on port " + PORT);
});
