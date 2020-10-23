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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vatoslocos", { useNewUrlParser: true }, { useUnifiedTopology: true }, { useCreateIndex: true}, { useFindModify: false});
const connection = mongoose.connection
connection.on("connected", () => {
    console.log("your connected with mongoose boiii")
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

app.get("/config", (req, res) => {
  //db.War.find({})
    //.then(dbWar => {
      res.json({success: true});
    // })
    // .catch(err => {
    //   res.json(err);
    // });
});

app.get("/api/exersise", (req, res) => {
  db.Workout.find({})
    .then((foundworkout) => {
      res.json(foundworkout);
    })
    .catch(err => {
      res.json(err);
    });
});

 app.post("/api/exersise", (req, res) => {
   db.Exersise.create(req.body).then((newejer) => {
       res.json(newejer);
   })
//     .then(({ _id }) => db.MOR.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbmor => {
//       res.json(dbmor);
//     })
//     .catch(err => {
//       res.json(err);
//     });
 });

// app.get("/populateduser", (req, res) => {
//   db.User.find({}).populate("notes").then(dbUser => {
//     res.json(dbUser);
//   }).catch(err => {
//     res.json(err);

//   })
  
// });
// app.put("api/workout/:id", (req, res) => {
//     db.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
//         (updatedWorkouts) =>{
//             res.json(updatedWorkouts)
//         }
//     )
// })

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
