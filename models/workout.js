const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exersiseSchema = new Schema({
  title: String,
  body: String
});

const fatboi = mongoose.model("Note", FatboiSchema);

module.exports = fatboi;
