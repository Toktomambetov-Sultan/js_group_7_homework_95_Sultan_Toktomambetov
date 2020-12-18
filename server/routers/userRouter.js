const express = require("express");
const schema = require("./../Models");
const router = express.Router();
const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const { OAuth2Client } = require("google-auth-library");
const config = require("../config");

const client = new OAuth2Client(config.GoogleClientId);

router.get("/", async (req, res) => {
  try {
    const users = await schema.User.find(req.query);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.post("/log_out", authorizationMiddleware(true), async (req, res) => {
  try {
    req.user.generateToken();
    await req.user.save({ validateBeforeSave: false });
    res.send({ message: "user loged out" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getInByGoogle", async (req, res) => {
  try {
    const { tokenId } = req.body;
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: config.GoogleClientId,
    });
    const payload = response.getPayload();
    let user = await schema.User.findOne({
      email: payload.email,
    });

    if (!user) {
      user = new schema.User({
        role: !!(config.adminEmails.indexOf(payload.email) + 1)
          ? "admin"
          : "user",
        email: payload.email,
        displayName: payload.name,
        avatarImage: payload.picture,
      });
    }
    user.generateToken();
    await user.save({ validateBeforeSave: false });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
