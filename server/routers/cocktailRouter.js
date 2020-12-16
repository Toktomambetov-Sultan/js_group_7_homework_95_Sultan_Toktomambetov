const express = require("express");
const router = express.Router();
const auhtorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const permitMiddleware = require("./../tools/routers/permitMiddleware");

const schema = require("./../Models");

router.get("/", auhtorizationMiddleware, async (req, res) => {
  try {
    const cocktails = await schema.Cocktail.find({
      user: req.user._id,
    });
    res.send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const cocktails = await schema.Cocktail.find({
      published: true,
    });
    res.send(cocktails);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

router.post("/", auhtorizationMiddleware, async (req, res) => {
  try {
    delete req.body.published;
    const cocktail = new schema.Cocktail(req.body);
    res.send(cocktail);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Wrong request.",
      error,
    });
  }
});

router.post(
  "/accept",
  [auhtorizationMiddleware, permitMiddleware("admin")],
  async (req, res) => {
    try {
      const cocktail = await schema.Cocktail.findByIdAndUpdate(req.body.id, {
        published: true,
      });
      res.send(cocktail);
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
