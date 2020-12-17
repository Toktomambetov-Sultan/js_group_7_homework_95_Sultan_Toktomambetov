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
    required: true,
  },
  ingredients: {
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
    required: true,
  },
});

CocktailModel.post("find", async function (docs, next) {
  for (let doc of docs) {
    await unpublicUser(doc);
  }
  console.log(docs[0].user);
  next();
});

module.exports = CocktailModel;
