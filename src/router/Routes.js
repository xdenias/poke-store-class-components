import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PokemonPlant from "../pages//pokemontypeplant/PokemonTypePlant";
import PokemonWater from "../pages//pokemontypewater/PokemonTypeWater";
import Home from "../pages/home/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/store1">
          <PokemonPlant />
        </Route>
        <Route exact path="/store2">
          <PokemonWater />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
