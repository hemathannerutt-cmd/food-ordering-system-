const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Load Food Items
app.get("/foods", (req, res) => {
  const data = JSON.parse(fs.readFileSync("db.json"));
  res.json(data.foods);
});

// Place Order
app.post("/order", (req, res) => {
  const order = req.body;

  const data = JSON.parse(fs.readFileSync("db.json"));
  data.orders.push(order);

  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

  res.json({ message: "Order Placed Successfully ✅" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
