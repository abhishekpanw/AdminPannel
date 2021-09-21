import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="assest/Images/user.png"
                className="img-circle"
                alt="User Image"
              />
            </div>
            <div className="pull-left info">
              <p>Abhishek</p>
            </div>
          </div>

          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active treeview">
              <Link to="/">
                <i className="fa fa-dashboard" /> <span>Dashboard</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/profile">
                <i className="fa fa-dashboard" /> <span>Profile</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/user">
                <i className="fa fa-dashboard" /> <span>User</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

export default Sidebar;
