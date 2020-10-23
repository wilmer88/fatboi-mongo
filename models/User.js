const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MorSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  imprortant: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const Mor = mongoose.model("Mor", UserSchema);

module.exports = Mor;
