import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
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
              <p>{props.value}</p>
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
              <Link to="/user">
                <i class="fa fa-user" aria-hidden="true" />
                <span>User</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/editor">
                <i class="fa fa-rss" aria-hidden="true" />
                <span>CMS</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/category">
                <i class="fa fa-list-alt" aria-hidden="true" />
                <span>Category</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/subcategory">
                <i class="fa fa-address-card-o" aria-hidden="true" />
                <span>SubCategory</span>
              </Link>
            </li>
            <li className="active treeview">
              <Link to="/product">
                <i class="fa fa-product-hunt" aria-hidden="true"></i>
                <span>Product</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}

export default Sidebar;
