const mongoose = require("mongoose");
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

module.exports = CocktailModel;
