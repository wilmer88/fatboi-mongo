const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//connecting with mongoose connection code
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true }, { useUnifiedTopology: true });
const connection = mongoose.connection
connection.on("connected", () => {
    console.log("your connected with mongoose boiii")
});
connection.on("error",(err) => {
    console.log("somthings wrong trying to connect to mongoose y pues:", err)
});

app.get("/", (req, res) => {
 res.sendFile(path.join(_dirname + "./public/index.html"));
});

app.get("/stats", (req, res) =>{
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
