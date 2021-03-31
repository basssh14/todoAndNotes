const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  notes: [
    {
      text: {
        type: String,
        required: true,
      },
      flag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "flags",
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = notes = mongoose.model("notes", notesSchema);
