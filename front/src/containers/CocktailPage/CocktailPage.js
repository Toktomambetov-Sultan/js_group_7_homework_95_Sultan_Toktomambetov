import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import CocktailTempalte from "../../components/CocktailTempalte/CocktailTempalte";
import { getCurrentCocktail } from "../../store/cocktail/cocktailAction";

const CocktailPage = (props) => {
  const state = useSelector((state) => state.cocktail);
  const dispatch = useDispatch();

  if (
    !(
      state.cocktails.map((item) => item._id).indexOf(props.match.params.id) + 1
    )
  )
    return <Redirect to="/cocktails/all" />;
  return (
    <div>
      <CocktailTempalte cocktail={state.currentCocktail} />
    </div>
  );
};

export default CocktailPage;
