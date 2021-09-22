import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Header(props) {
  const [redirect, setRedirect] = useState(false);
  const logout = () => {
    setRedirect(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div>
      {redirect && <Redirect to="/signin" />}
      <header className="main-header">
        {/* Logo */}
        <a href="/" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>C</b>QL
          </span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">
            <b>Cqlsys</b>
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
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
              {/* Messages: style can be found in dropdown.less*/}

              {/* User Account: style can be found in dropdown.less */}
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src="assest/Images/user.png"
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">{props.value}</span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src="assest/Images/user.png"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>{props.value}</p>
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
