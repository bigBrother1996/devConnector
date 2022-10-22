const express = require("express");

require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send("okay");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});