const express = require("express");
const app = express();
const connectDB = require("./config/db");
const routes = require("./routes/route");

app.use(express.json());
app.use("/api/v1", routes);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome Page");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
