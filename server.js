
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const workoutController = require("./routes/workoutController");
const views = require("./routes/views");


const PORT = process.env.PORT || 3000;

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware for running public folder
app.use(express.static("public"));

// mongoose middleware
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// mongoose connected successfully 
const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

// Logs if there is an error on connection
connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});




app.use(workoutController);
app.use(views);


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
});