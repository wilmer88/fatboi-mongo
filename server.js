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
  res.sendFile(path.join(__dirname + "./public/stats.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/exercise.html"));
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7).then((lastWorkout) => {
    res.json(lastWorkout);
  }).catch(err => {
    console.log(err);
    res.json({
      error= true,
      data:null,
      message: "fail to get workout range"
    })
  })
});

app.post("/api/workouts", (req, res) => {
  console.log(req.body);
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.put("/api/workouts/:id", (req, res) => {
  
  db.Workout.findOneAndUpdate(req.params.id, req.body, {new:true})
.then((dbUpdate) => {
      res.send(dbUpdate);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        date: null,
        message: "faild to update"
      })
    });
});
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
