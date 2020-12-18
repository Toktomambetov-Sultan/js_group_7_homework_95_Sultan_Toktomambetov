import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import CocktailsPage from "./containers/CocktailsPage/CocktailsPage";
import AddCocktailPage from "./containers/AddCocktailPage/AddCocktailPage";
const CustomRoute = (props) => {
  const user = useSelector((state) => state.user.user);
  if (user?.token) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/cocktails/all" exact component={CocktailsPage} />
        <CustomRoute path="/cocktails/my" exact component={CocktailsPage} />
        <CustomRoute path="/cocktails/add" exact component={AddCocktailPage} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
