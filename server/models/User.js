const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    password: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true
    },

    firstname: {
      type: String,
      trim: true,
      required: true
    },
    lastname: {
      type: String,
      trim: true,
      required: true
    },
    division: {
      type: String,
      trim: true,
      required: true
    },
    subdivision: {
      type: String,
      trim: true,
      required: true
    },
    eid: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    code: {
      type: String,
      trim: true,
      required: true
    },
    phone: {
      type: String,
      trim: true,
      required: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["root", "user", "admin"]
    },
    authyId: {
      type: String
    },
    verified: {
      type: Boolean,
      required: true,
      default: false
    },
    online: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
