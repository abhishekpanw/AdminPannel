import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { getItem } from "../../Rounting/Authentication";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5000/users/${getItem()._id}`, values)
        .then((res) => {
          setValues(res.data);
        });
    } catch (err) {
      console.log(err.response);
    }
  }, [setValues]);

  return (
    <div>
      <Header />
      <Sidebar />
      <div
        className="box box-primary"
        style={{
          width: "500px",
          marginTop: "77px",
          border: "1px solid green",
          padding: "18px",
          float: "right",
          marginRight: "31px",
        }}
      >
        <div className="box-body box-profile">
          <img
            className="profile-user-img img-responsive img-circle"
            src="assest/Images/user.png"
            alt="User profile picture"
          />
          <h3 className="profile-username text-center">{values.fullName}</h3>
          <p className="text-muted text-center">React Speciallist</p>
          <ul className="list-group list-group-unbordered">
            <li className="list-group-item">
              <b>{values.fullName}</b> <a className="pull-right"></a>
            </li>
            <li className="list-group-item">
              <b>{values.email}</b> <a className="pull-right"></a>
            </li>
            <li className="list-group-item">
              <b>123456789</b> <a className="pull-right"></a>
            </li>
          </ul>
        </div>
        {/* /.box-body */}
      </div>
      <div
        className="nav-tabs-custom"
        style={{
          width: "500px",
          marginTop: "77px",
          border: "1px solid green",
          padding: "18px",
          float: "right",
          marginRight: "31px",
        }}
      >
        <Formik
          initialValues={values}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !values.fullName
              // !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.fullName = "Required";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(false);
              await axios
                .put(`http://localhost:5000/users/${getItem()._id}`, values)
                .then((res) => {
                  setValues(res.data);
                });
            } catch (err) {
              toast.error(err.response.data);
            }
          }}
        >
          {({ isSubmitting }) => (
            <div className="tab-pane" id="settings">
              <Form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="inputName" className="col-sm-2 control-label">
                    FullName
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                    />
                  </div>
                  <ErrorMessage name="fullName" component="div" />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-2 control-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputName" className="col-sm-2 control-label">
                    Phone No.
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="Phone_number"
                    />
                  </div>
                  <ErrorMessage name="Phone_number" component="div" />
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-danger"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
