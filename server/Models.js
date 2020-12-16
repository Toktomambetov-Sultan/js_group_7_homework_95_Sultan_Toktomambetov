const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");
const CocktailModel = require("./Models/CocktailModel");

const User = mongoose.model("User", UserModel);
const Cocktail = mongoose.model("Cocktail", CocktailModel);

module.exports = {
  User,
  Cocktail,
};
