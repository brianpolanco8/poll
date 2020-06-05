import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components";
import { Chat } from "./components/Chat";

const Routes = ({ user }) => {
  return (
    <Switch>
      {/* <Route
        exact
        path="/"
        render={() =>
          user ? <Redirect to="/chat" /> : <Redirect to="/login" />
        }
      /> */}
      {/* <Route exact path="/" component={Chat} /> */}
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
};

export default Routes;
