import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { getItem } from "../../Rounting/Authentication";

function Header(props) {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState({
    fullName: "",
    email: "",
  });
  const logout = () => {
    setRedirect(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/users/${getItem()._id}`, name)
        .then((res) => {
          setName(res.data);
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", res.data);
        });
    } catch (err) {
      console.log(err.response);
    }
  }, [props.value]);

  return (
    <div>
      {redirect && <Redirect to="/signin" />}
      <header className="main-header">
        <a href="/" className="logo">
          <span className="logo-mini">
            <b>C</b>QL
          </span>
          <span className="logo-lg">
            <b>Cqlsys</b>
          </span>
        </a>
        <nav className="navbar navbar-static-top">
          <a
            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="assest/Images/user.png"
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">{name.fullName}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img
                      src="assest/Images/user.png"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>{name.fullName}</p>
                  </li>

                  <li
                    className="user-footer"
                    style={{ backgroundColor: "#e06e6e" }}
                  >
                    <div className="pull-left">
                      <Link to="/profile" className="btn btn-default btn-flat">
                        Profile
                      </Link>
                    </div>
                    <div className="pull-right">
                      <button
                        onClick={() => logout()}
                        className="btn btn-default btn-flat"
                      >
                        Sign out
                      </button>
                    </div>
                  </li>
                </ul>
              </li>

              <li>
                <a href="#" data-toggle="control-sidebar">
                  <i className="fa fa-gears" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
