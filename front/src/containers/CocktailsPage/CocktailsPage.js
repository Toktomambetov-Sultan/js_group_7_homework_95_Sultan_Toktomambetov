import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CocktailItem from "../../components/CocktailItem/CocktailItem";
import { getCocktails } from "./../../store/cocktail/cocktailAction";
import Sidebar from "./../../components/Sidebar/Sidebar";

const CocktailsPage = (props) => {
  const state = useSelector((state) => state.cocktail);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);
  const onDelete = (id) => console.log(id);
  const onAccept = (id) => console.log(id);
  const onClick = (id) => console.log(id);

  const filteredCocktails = state.cocktails.filter((item) => {
    switch (props.history.location.pathname) {
      case "/cocktails/all":
        return item.published;
      case "/cocktails/my":
        if (!user?.token) return false;
        return !item.published && user._id === item.user._id;
      default:
        return false;
    }
  });
  return (
    <div>
      <CssBaseline />
      <Grid container direction="row">
        <Grid xs={12} md={4} item>
          <Sidebar />
        </Grid>
        <Grid xs={12} md={8} item container alignItems="stretch">
          {filteredCocktails.map((cocktail) => (
            <CocktailItem
              key={cocktail._id}
              cocktail={cocktail}
              onDelete={() => onDelete(cocktail._id)}
              onAccept={() => onAccept(cocktail._id)}
              onClick={() => onClick(cocktail._id)}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default CocktailsPage;
