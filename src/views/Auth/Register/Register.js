import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin } from "../../../Rounting/Authentication";

function Register() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Please provide a valid password"),
      confirm_password: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
        await axios
          .post("http://localhost:5000/users/register", values)
          .then((res) => {
            localStorage.setItem("token", JSON.stringify(res.data));
            resetForm({});
          });
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });
  return (
    <div
      className="register-box"
      style={{ border: "2px solid #0fad90", boxShadow: "1px 4px 12px 0px" }}
    >
      <div className="register-logo" style={{ margin: "0px" }}>
        {isLogin() && <Redirect to="/" />}
        <Link to="#">
          <b>SIGN</b>UP
        </Link>
      </div>
      <div
        className="register-box-body"
        style={{ padding: "12px 20px 39px 20px" }}
      >
        <p className="login-box-msg">Register a new membership</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              id="fullName"
              name="fullName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div style={{ color: "red" }}>{formik.errors.fullName}</div>
            ) : null}
            <span className="glyphicon glyphicon-user form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Retype password"
              id="confirm_password"
              name="confirm_password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_password}
            />
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirm_password}
              </div>
            ) : null}
            <span className="glyphicon glyphicon-log-in form-control-feedback" />
          </div>
          <>
            <div className="col-xs-4">
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
              >
                Register
              </button>
            </div>
          </>
        </form>
        {/* <div className="social-auth-links text-center">
          <p>- OR -</p>
          <Link
            to="#"
            className="btn btn-block btn-social btn-facebook btn-flat"
          >
            <i className="fa fa-facebook" /> Sign up using Facebook
          </Link>
          <Link to="#" className="btn btn-block btn-social btn-google btn-flat">
            <i className="fa fa-google-plus" /> Sign up using Google+
          </Link>
        </div> */}
        <Link to="/signin" className="text-center">
          I already have a membership
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
