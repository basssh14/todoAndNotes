const mongoose = require("mongoose");
const flagsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  flags: [
    {
      tipo: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      Date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = flags = mongoose.model("flags", flagsSchema);
