const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Test Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Foods API
app.get("/foods", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  res.json(data.foods);
});

// Order API
app.post("/order", (req, res) => {
  const order = req.body;

  const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  data.orders.push(order);

  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ message: "✅ Order Placed Successfully!" });
});

// Start Server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

