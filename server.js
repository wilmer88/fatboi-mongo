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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/architectura", { useNewUrlParser: true }, { useUnifiedTopology: true });
const connection = mongoose.connection
connection.on("connected", () => {
    console.log("your connected with mongoose cuz your working hard")
});
connection.on("error",(err) => {
    console.log("somthings wrong trying to connect to mongoose y pues:", err)
});
// db.WarMOR.create({ name: "change" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

app.get("/api/workouts", (req, res) => {
  //db.War.find({})
    //.then(dbWar => {
      res.json({success: true});
    // })
    // .catch(err => {
    //   res.json(err);
    // });
});

app.get("/api/workouts/name", (req, res) => {
//   db.War.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/morsut", ({ body }, res) => {
//   db.Mor.create(body)
//     .then(({ _id }) => db.MOR.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbmor => {
//       res.json(dbmor);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {
//   db.User.find({}).populate("notes").then(dbUser => {
//     res.json(dbUser);
//   }).catch(err => {
//     res.json(err);

//   })
  
// });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
