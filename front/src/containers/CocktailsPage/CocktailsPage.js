import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CocktailItem from "../../components/CocktailItem/CocktailItem";
import { getCocktails } from "./../../store/cocktail/cocktailAction";

const CocktailsPage = () => {
  const state = useSelector((state) => state.cocktail);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);
  const onDelete = (id) => console.log(id);
  const onAccept = (id) => console.log(id);
  const onClick = (id) => console.log(id);
  console.log(user);
  return (
    <div>
      <CssBaseline />
      <Grid container alignItems="stretch">
        {state.cocktails.map((cocktail) => (
          <CocktailItem
            key={cocktail._id}
            cocktail={cocktail}
            onDelete={() => onDelete(cocktail._id)}
            onAccept={() => onAccept(cocktail._id)}
            onClick={() => onClick(cocktail._id)}
          />
        ))}
      </Grid>
    </div>
  );
};

export default CocktailsPage;
