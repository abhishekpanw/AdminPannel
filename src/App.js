import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Blank from "./views/pages/Blank";
import Login from "./views/Auth/Login";
import Editar from "./views/cms/Editar";
import Register from "./views/Auth/Register/Register";
import Profile from "./views/pages/Profile";
import User from "./views/pages/User";
import PublicRoute from "./Rounting/PublicRoute";
import PrivateRoute from "./Rounting/PrivateRoute";
import Category from "./views/pages/Category";
import SubCategory from "./views/pages/SubCategory";
import Product from "./views/pages/Product";
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
          <PrivateRoute component={Editar} path="/editor" exact />
          <PrivateRoute component={Category} path="/category" exact />
          <PrivateRoute component={SubCategory} path="/subcategory" exact />
          <PrivateRoute component={Product} path="/product" exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
