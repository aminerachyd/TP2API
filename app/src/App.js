import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/home/Home";
import CheckNewItem from "./components/checknewitem/CheckNewItem";

function App() {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Switch>
          {/* La route home, contient les news avec un petit formulaire d'ajout de nouvelle new */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* La route d'une seule new, permet de visualiser toute la new avec possibilité de la modifier/supprimer */}
          <Route exact path="/new/:id">
            <CheckNewItem />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
