import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Blank from "./views/pages/Blank";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register/Register";
import Profile from "./views/pages/Profile";
import User from "./views/pages/User";
import PublicRoute from "./Rounting/PublicRoute";
import PrivateRoute from "./Rounting/PrivateRoute";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <PublicRoute
            restricted={false}
            component={Login}
            path="/signin"
            exact
          />
          <PublicRoute
            restricted={false}
            component={Register}
            path="/signup"
            exact
          />
          <PrivateRoute component={Blank} path="/" exact />
          <PrivateRoute component={Profile} path="/profile" exact />
          <PrivateRoute component={User} path="/user" exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
