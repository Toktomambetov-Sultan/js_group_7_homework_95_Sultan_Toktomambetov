const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const uniqueValidate = require("../tools/models/uniqueValidate");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: uniqueValidate("User", "username"),
  },
  avatarImage: String,
  displayName: {
    required: true,
    type: String,
  },
  role: {
    required: true,
    default: "user",
    type: String,
    enum: ["admin", "user"],
  },
  token: {
    type: String,
    required: true,
  },
});




UserModel.methods.generateToken = function () {
  this.token = nanoid();
};

module.exports = UserModel;
