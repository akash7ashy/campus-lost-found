const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const items = [
  
];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  items.push(req.body);

  res.json({
    message: "Item added successfully",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});