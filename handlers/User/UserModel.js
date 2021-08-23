const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enc_password: {
    type: String,
    required: true,
  },
  salt: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  role: {
    type: String,
    enum: ["STUDENT", "TEACHER"],
    default: "TEACHER",
  },
  history: [
    {
      score: Number,
      quiz: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
      },
    },
  ],
});

// ? Virutuals for schema
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.enc_password = this.securePassword(password);
  })
  .get(() => {
    return this._password;
  });

// ? schema methods
UserSchema.methods = {
  // check for valid password during signin
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.enc_password;
  },
  // encrypt the password so that it's not visible as plain text
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
