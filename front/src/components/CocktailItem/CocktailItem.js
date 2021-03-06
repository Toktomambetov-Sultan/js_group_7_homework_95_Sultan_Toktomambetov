import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import config from "../../config";
import ButtonsForAdmin from "../ButtonsForAdmin/ButtonsForAdmin";

const useStyle = makeStyles((theme) => ({
  item: {
    margin: "20px",
    width: "333px",
  },
  button: {
    flexGrow: "1",
    maxWidth: "400px",
    textTransform: "inherit",
  },
  buttons: {
    marginTop: "auto",
  },
  image: {
    width: "300px",
    height: "auto",
    maxHeight: "300px",
  },
}));

const CocktailItem = ({ cocktail, onClick, onAccept, onDelete }) => {
  const classes = useStyle();
  const user = useSelector((state) => state.user.user);
  return (
    <Grid
      item
      container
      className={classes.item}
      direction="column"
      justify="space-between"
    >
      <Button
        color="primary"
        onClick={onClick}
        variant="outlined"
        className={classes.button}
      >
        <Grid container direction="column">
          <Grid container direction="column">
            <Grid item container justify="space-between" alignItems="center">
              <Typography variant="h6">Name:</Typography>{" "}
              <Typography variant="subtitle1">{cocktail.name}</Typography>
            </Grid>
            <Grid item container justify="space-between" alignItems="center">
              <Typography variant="h6">Published:</Typography>{" "}
              <Typography variant="subtitle1">
                {cocktail.published ? "yes" : "no"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {cocktail.image && (
              <img
                className={classes.image}
                alt={cocktail.name}
                src={config.ImageUrl + cocktail.image}
              />
            )}
          </Grid>
        </Grid>
      </Button>
      {user?.role === "admin" && (
        <ButtonsForAdmin
          obj={cocktail}
          onDelete={onDelete}
          onAccept={onAccept}
        />
      )}
    </Grid>
  );
};

export default CocktailItem;
