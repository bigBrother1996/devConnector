const express = require("express");
const connectDB = require("./db");

const app = express();
// init body parser
app.use(express.json({ extended: false }));
// connect db

connectDB();
// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
