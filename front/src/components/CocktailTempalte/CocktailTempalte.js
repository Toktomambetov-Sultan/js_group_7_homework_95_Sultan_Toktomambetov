import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

import React from "react";
import config from "../../config";

const useStyles = makeStyles((theme) => ({
  Image: {
    width: "250px",
    height: "250px",
  },
  element: {
    margin: "5px",
    border: "1px solid green",
    borderRadius: "4px",
  },
  item: {
    margin: "10px 0 ",
    maxWidth: "90%",
    background: "#fff",
  },
}));

const CocktailTemplate = ({ cocktail }) => {
  const classes = useStyles();
  return (
    <Box m={1} bgcolor="lightblue" padding="20px" borderRadius="5px">
      <Grid container direction="column" spacing={4}>
        <Grid
          item
          container
          direction="row"
          wrap="nowrap"
          justify="space-between"
        >
          <img
            className={classes.Image}
            src={config.ImageUrl + cocktail?.image}
            alt={cocktail?.title || "image"}
          />
          <Grid item xs={6} container direction="column" spacing={3}>
            <Grid
              item
              container
              className={classes.element}
              direction="row"
              justify="space-between"
            >
              <Typography variant="h6">Name:</Typography>
              <Typography variant="h6">{cocktail?.name}</Typography>
            </Grid>
            <Grid
              item
              container
              className={classes.element}
              direction="row"
              justify="space-between"
            >
              <Typography variant="h6">Author:</Typography>
              <Typography variant="h6">{cocktail?.user.email}</Typography>
            </Grid>
            <Grid
              item
              container
              className={classes.element}
              direction="row"
              justify="space-between"
            >
              <Typography variant="h6">Published:</Typography>
              <Typography variant="h6">
                {cocktail?.published ? "yes" : "no"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={classes.element} item>
          <Typography variant="h6">Recipe:</Typography>
          <p>{cocktail?.recipe}</p>
        </Grid>
        <Grid className={classes.element} item>
          <Typography variant="h4">Ingredients:</Typography>
          <Grid container spacing={1} direction="column" alignItems="center">
            {cocktail?.ingredients.map((ingredient, index) => (
              <Grid
                item
                key={index}
                className={classes.item}
                container
                direction="row"
                justify="space-between"
              >
                <Typography variant="h6">{ingredient.name}</Typography>
                <Typography variant="h6">{ingredient.quantity}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CocktailTemplate;
