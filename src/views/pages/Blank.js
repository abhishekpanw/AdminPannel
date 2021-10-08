import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";

const Blank = () => {
  const [category, setCategory] = useState("");
  const [Product, setProduct] = useState("");
  const [Subcount, setSubcount] = useState("");
  const [user, setUser] = useState("");

  useEffect(async () => {
    await axios.get("http://localhost:5000/Categorycount").then((res) => {
      setCategory(res.data);
    });
    await axios.get("http://localhost:5000/Productcount").then((res) => {
      setProduct(res.data);
    });
    await axios.get("http://localhost:5000/SubCategorycount").then((res) => {
      setSubcount(res.data);
    });
    await axios.get("http://localhost:5000/Usercount").then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Dashboard <small>it all starts here</small>
          </h1>
        </section>
        <div className="box">
          <div className="box-header with-border">
            <div className="row">
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-aqua">
                  <div className="inner">
                    <h3>{user}</h3>
                    <p>User Registrations</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <Link to="/user" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>{category}</h3>
                    <p>Category</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <Link to="/category" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>{Subcount}</h3>
                    <p>Sub Category</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <Link to="/subcategory" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-xs-6">
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>{Product}</h3>
                    <p>Products</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <Link to="/product" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blank;
