import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Password(props) {
  const [redirect, setRedirect] = useState(false);

  const Token = props.match.params.token;
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please provide a valid password"),
      confirm_password: Yup.string().when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(false);
        await axios
          .post(`http://localhost:5000/resetPassword/${Token}`, values)
          .then((res) => {
            setRedirect(true);
            toast.success(res.data.message);
          });
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
  });
  return (
    <>
      {redirect && <Redirect to="/" />}

      <div
        className="register-box"
        style={{
          border: "2px solid #0fad90",
          boxShadow: "1px 4px 12px 0px",
          padding: "12px 12px 18px",
        }}
      >
        <div className="register-logo" style={{ margin: "0px" }}>
          <Link to="#">
            <b>CREATE</b>NEW PASSWORD
          </Link>
        </div>
        <div
          className="register-box-body"
          style={{ padding: "12px 20px 39px 20px" }}
        >
          <p className="login-box-msg">Please Enter your New Password</p>
          <form onSubmit={formik.handleSubmit}>
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
              <button
                type="submit"
                className="btn btn-primary btn-block btn-flat"
                style={{ width: "125px" }}
              >
                Change Password
              </button>
            </>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Password;
