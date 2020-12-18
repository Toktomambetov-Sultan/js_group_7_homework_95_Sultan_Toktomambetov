const schema = require("../Models");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("../config");
const fs = require("fs").promises;
mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});
const db = mongoose.connection;

db.once("open", async () => {
  await Promise.all(
    (await fs.readdir(config.ImageUploadingDir)).map((item) => {
      if (item === ".gitignore") return;
      fs.unlink(config.ImageUploadingDir + "/" + item);
    })
  );
  await Promise.all(
    (await fs.readdir(config.FixturesImagesDir)).map((item) =>
      fs.copyFile(
        `${config.FixturesImagesDir}/${item}`,
        `${config.ImageUploadingDir}/${item}`
      )
    )
  );
  try {
    await db.dropDatabase();
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }
  const user1 = await schema.User.create({
    email: "cenfy120324@gmail.com",
    avatarImage:
      "https://lh5.googleusercontent.com/-skHNUx0Ypb8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnrWJ4-pfMZlQutrqU6tiUq8yNlsw/s96-c/photo.jpg",
    displayName: "Sultan Toktomambetov",
    role: "user",
    token: nanoid(),
  });
  const ingredient = { name: "ingredient1", quantity: "1unit" };

  await schema.Cocktail.create(
    {
      user: user1._id,
      name: "name",
      image: "cocktail1.png",
      published: true,
      recipe: "recipe",
      ingredients: [ingredient, ingredient, ingredient],
    },
    {
      user: user1._id,
      name: "name",
      image: "cocktail2.png",
      published: true,
      recipe: "recipe",
      ingredients: [ingredient, ingredient, ingredient],
    },
    {
      user: user1._id,
      name: "name",
      image: "cocktail3.png",
      published: false,
      recipe: "recipe",
      ingredients: [ingredient, ingredient, ingredient],
    },
    {
      user: user1._id,
      name: "name",
      image: "cocktail4.jpeg",
      published: false,
      recipe: "recipe",
      ingredients: [ingredient, ingredient, ingredient],
    }
  );
  db.close();
});
