const express = require("express");
const router = express.Router();

const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const permitMiddleware = require("./../tools/routers/permitMiddleware");

const schema = require("./../Models");

router.get("/all", authorizationMiddleware(false), async (req, res) => {
  try {
    const cocktails = await schema.Cocktail.find({
      $or: [
        {
          published: true,
        },
        {
          published: req.user && req.user.role !== "admin",
        },
        {
          user: req.user && req.user._id,
        },
      ],
    });
    res.send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

router.get("/one", authorizationMiddleware(false), async (req, res) => {
  try {
    const cocktail = await schema.Cocktail.find({
      $or: [
        {
          published: true,
        },
        {
          published: req.user && req.user.role !== "admin",
        },
        {
          user: req.user && req.user._id,
        },
      ],
      _id: req.query.id,
    });

    res.send(cocktail[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

const ingredientErrorSend = (res, message) =>
  res.status(400).send({
    error: {
      errors: {
        ingredients: {
          message,
        },
      },
    },
  });

router.post(
  "/",
  [authorizationMiddleware(true), uploadImage.single("image")],
  async (req, res) => {
    try {
      delete req.body.published;
      req.body.ingredients = req.body.ingredients || [];

      if (!req.body.ingredients.length)
        return ingredientErrorSend(res, "ingredients is empty");
      const ingredientsAccept = !req.body.ingredients.reduce(
        (acc, item) => acc && item.name && item.quantity,
        true
      );
      if (ingredientsAccept)
        return ingredientErrorSend(res, "fill in all fields of ingridients");

      const cocktail = new schema.Cocktail({
        ...req.body,
        user: req.user._id,
      });
      cocktail.image = req.file && req.file.filename;
      await cocktail.save();
      res.send(cocktail);
    } catch (error) {
      req.file &&
        (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
      res.status(400).send({
        message: "Wrong request.",
        error,
      });
    }
  }
);

router.post(
  "/accept",
  [authorizationMiddleware(true), permitMiddleware("admin")],
  async (req, res) => {
    try {
      await schema.Cocktail.findByIdAndUpdate(req.body.id, {
        published: true,
      });
      res.send({ message: "cocktail's just updated." });
    } catch (error) {
      res.status(400).send({
        message: "Wrong request.",
        error,
      });
    }
  }
);

router.post(
  "/accept",
  [authorizationMiddleware(true), permitMiddleware("admin")],
  () => {}
);

router.delete(
  "/",
  [authorizationMiddleware(true), permitMiddleware("admin")],
  async (req, res) => {
    try {
      await schema.Cocktail.findByIdAndDelete(req.body.id);
      res.send({ message: "successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Wrong request.",
        error,
      });
    }
  }
);

module.exports = router;
