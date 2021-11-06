import React from "react";
import Home from "./home";
import Search from "./search";
import { Route } from "react-router-dom";

const Routes = () => {
  return (
    <React.Fragment>
      <Route component={Search} exact path="/search" />
      <Route component={Home} path="/" exact />
    </React.Fragment>
  );
};

export default Routes;
