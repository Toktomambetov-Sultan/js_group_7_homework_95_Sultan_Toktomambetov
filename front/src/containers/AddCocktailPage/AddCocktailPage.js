import { Container, Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CocktailForm from "../../components/CocktailForm/CocktailForm";
import { postCocktail } from "../../store/cocktail/cocktailAction";

const AddCocktailPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cocktail);
  const [currentCocktail, setCurrentCocktail] = useState({
    name: "",
    recipe: "",
    image: null,
    ingredients: [],
  });
  const onFormChange = (event) => {
    const { name } = event.target;
    let value;
    switch (name) {
      case "image":
        value = event.target.files[0];
        break;
      default:
        value = event.target.value;
    }
    setCurrentCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const setIngredients = (data) =>
    setCurrentCocktail((prevState) => ({ ...prevState, ingredients: data }));
  const onFormSubmit = (event) => {
    event.preventDefault();
    dispatch(postCocktail(currentCocktail));
  };
  return (
    <Container component="main">
      <CocktailForm
        cocktail={currentCocktail}
        onChange={onFormChange}
        onSubmit={onFormSubmit}
        error={state.error?.error?.errors}
        setIngredients={setIngredients}
      />
    </Container>
  );
};

export default AddCocktailPage;
