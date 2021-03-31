const mongoose = require("mongoose");
const todosSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  flag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flags",
    required: true,
  },
  selector: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todos = mongoose.model("todos", todosSchema);
