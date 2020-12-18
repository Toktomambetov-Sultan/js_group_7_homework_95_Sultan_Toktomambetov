const mongoose = require("mongoose");
const unpublicUser = require("../tools/models/unpublicUser");
const Schema = mongoose.Schema;

const CocktailModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
    required: true,
  },
  ingredients: {
    required: true,
    type: [
      {
        name: {
          required: true,
          type: String,
        },
        quantity: {
          required: true,
          type: String,
        },
      },
    ],
  },
});

CocktailModel.post("find", async function (docs, next) {
  for (let doc of docs) {
    await unpublicUser(doc);
  }
  next();
});

module.exports = CocktailModel;
