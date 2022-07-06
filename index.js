const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");

const mongoose = require("mongoose");

let mongoDBURL = "mongodb://127.0.0.1:27017/zoo";
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", console.error.bind(console, "onnection error:"));
database.on("open", () => {
  console.log("Connected to database");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`API is listening on port ${port}!`);
});
