import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import BounceLoader from "react-spinners/BounceLoader";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./otp.css";

const Forgot = ({ children }) => {
  const [isActive, setisActive] = useState();
  const onSubmit = async (values, { resetForm }) => {
    setisActive(true);
    try {
      await axios
        .post("http://localhost:5000/forget_password", values)
        .then((res) => {
          toast.success(res.data.message);
          resetForm({});
          setisActive(false);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div
        className="login-box"
        style={{ border: "2px solid #0fad90", boxShadow: "1px 4px 12px 0px" }}
      >
        <div className="login-logo" style={{ marginBottom: "0px" }}>
          <Link to="/">
            <b>FORGOT</b>PASSWORD
          </Link>
        </div>
        <div
          className="login-box-body"
          style={{ padding: " 0px 20px 26px 20px", height: "179px" }}
        >
          <p className="login-box-msg">Please Enter your Email</p>

          <Formik
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = (
                  <h1
                    style={{
                      fontSize: "14px",
                      color: "red",
                      marginTop: "9px",
                    }}
                  >
                    Required
                  </h1>
                );
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              return errors;
            }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group has-feedback">
                  <LoadingOverlay active={isActive} spinner={<BounceLoader />}>
                    {children}
                  </LoadingOverlay>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <span className="glyphicon glyphicon-envelope form-control-feedback" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block btn-flat"
                    disabled={isSubmitting}
                    style={{ width: "117px" }}
                  >
                    Confirm Email
                  </button>
                </>
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Forgot;
