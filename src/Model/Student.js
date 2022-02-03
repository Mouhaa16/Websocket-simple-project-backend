const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
});

const StudentModel = mongoose.model("Student", StudentSchema);
module.exports = StudentModel;
