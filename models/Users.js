const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  profile_photo: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = users = mongoose.model("users", usersSchema);
