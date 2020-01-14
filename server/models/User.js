const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
