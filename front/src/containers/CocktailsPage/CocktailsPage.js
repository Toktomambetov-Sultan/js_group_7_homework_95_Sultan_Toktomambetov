import { CssBaseline, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CocktailItem from "../../components/CocktailItem/CocktailItem";
import {
  acceptCocktail,
  deleteCocktail,
  getCocktails,
  getCurrentCocktail,
} from "./../../store/cocktail/cocktailAction";
import Sidebar from "./../../components/Sidebar/Sidebar";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  cocktailsGrid: {
    border: "1px solid blue",
    height: "80vh",
    maxHeight: "80vh",
    overflowY: "scroll",
  },
}));

const CocktailsPage = (props) => {
  const classes = useStyles();
  const state = useSelector((state) => state.cocktail);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);
  const onDelete = (id) => {
    dispatch(deleteCocktail(id));
  };
  const onAccept = (id) => {
    dispatch(acceptCocktail(id));
  };
  const onClick = (id) => {
    console.log(id);
    dispatch(getCurrentCocktail(id));
  };

  const filteredCocktails = state.cocktails.filter((item) => {
    switch (props.history.location.pathname) {
      case "/cocktails/all":
        return item.published;
      case "/cocktails/my":
        if (!user?.token) return false;
        return user._id === item.user._id;
      case "/cocktails/admin":
        if (!user?.token) return false;
        return !item.published;
      default:
        return false;
    }
  });
  return (
    <div>
      <CssBaseline />
      <Grid container direction="row" alignItems="stretch">
        <Grid xs={12} md={4} item>
          <Sidebar />
        </Grid>
        <Grid
          xs={12}
          md={8}
          item
          container
          className={classes.cocktailsGrid}
          alignItems="center"
          justify="center"
        >
          {filteredCocktails.length ? (
            filteredCocktails.map((cocktail) => (
              <CocktailItem
                key={cocktail._id}
                cocktail={cocktail}
                onDelete={() => onDelete(cocktail._id)}
                onAccept={() => onAccept(cocktail._id)}
                onClick={() => onClick(cocktail._id)}
              />
            ))
          ) : (
            <Typography variant="h3">There isn't any cocktails.</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CocktailsPage;
