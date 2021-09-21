import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";
import Swal from "sweetalert2";
import * as Yup from "yup";

const User = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((res) => {
      setdata(res.data);
      console.log(res.data);
    });
  }, []);

  const deleteAlert = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        axios.delete(`http://localhost:5000/users/${id}`).then((res) => {
          setdata(data.filter((i) => i._id !== id));
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };

  const addUser = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Please provide a valid password"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
        await axios
          .post("http://localhost:5000/users/adduser", values)
          .then((res) => {
            setdata(res.data);
            resetForm({});
          });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const editUser = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Please provide a valid password"),
    }),

    onSubmit: () => {
      alert("hi");
    },
  });

  return (
    <>
      <Header />
      <Sidebar />

      <div className="content-wrapper">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title">USER Data Table</h3>
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target="#modal-info"
              style={{
                float: "right",
                padding: "0px 42px 2px",
                fontSize: "20px",
              }}
            >
              Add User
            </button>
          </div>
          <div class="box-body">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              {data.map((user) => {
                return (
                  <tbody>
                    <tr>
                      <td>{user._id}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          class="btn btn-success"
                          data-toggle="modal"
                          data-target="#modal-success"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => deleteAlert(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>

        {/*================================= Edit User ======================================== */}

        <div className="modal modal-success fade" id="modal-success">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">Edit Form</h4>
              </div>
              <div className="modal-body" style={{ height: "286px" }}>
                <form onSubmit={editUser.handleSubmit}>
                  <div className="form-group has-feedback">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      id="fullName"
                      name="fullName"
                      onChange={editUser.handleChange}
                      onBlur={editUser.handleBlur}
                      value={editUser.values.fullName}
                    />
                    {editUser.touched.fullName && editUser.errors.fullName ? (
                      <div style={{ color: "red" }}>
                        {editUser.errors.fullName}
                      </div>
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
                      onChange={editUser.handleChange}
                      onBlur={editUser.handleBlur}
                      value={editUser.values.email}
                    />
                    {editUser.touched.email && editUser.errors.email ? (
                      <div style={{ color: "red" }}>
                        {editUser.errors.email}
                      </div>
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
                      onChange={editUser.handleChange}
                      onBlur={editUser.handleBlur}
                      value={editUser.values.password}
                    />
                    {editUser.touched.password && editUser.errors.password ? (
                      <div style={{ color: "red" }}>
                        {editUser.errors.password}
                      </div>
                    ) : null}
                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                  </div>
                  <>
                    <div className="col-xs-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-flat"
                      >
                        Edit User
                      </button>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/*================================= Add User ======================================== */}

        <div className="modal modal-info fade" id="modal-info">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <h4 className="modal-title">Add User</h4>
              </div>
              <div
                className="modal-body"
                style={{
                  height: "286px",
                  backgroundColor: "#d0d5d6 !important",
                }}
              >
                <form onSubmit={addUser.handleSubmit}>
                  <div className="form-group has-feedback">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      id="fullName"
                      name="fullName"
                      onChange={addUser.handleChange}
                      onBlur={addUser.handleBlur}
                      value={addUser.values.fullName}
                    />
                    {addUser.touched.fullName && addUser.errors.fullName ? (
                      <div style={{ color: "red" }}>
                        {addUser.errors.fullName}
                      </div>
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
                      onChange={addUser.handleChange}
                      onBlur={addUser.handleBlur}
                      value={addUser.values.email}
                    />
                    {addUser.touched.email && addUser.errors.email ? (
                      <div style={{ color: "red" }}>{addUser.errors.email}</div>
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
                      onChange={addUser.handleChange}
                      onBlur={addUser.handleBlur}
                      value={addUser.values.password}
                    />
                    {addUser.touched.password && addUser.errors.password ? (
                      <div style={{ color: "red" }}>
                        {addUser.errors.password}
                      </div>
                    ) : null}
                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                  </div>
                  <>
                    <div className="col-xs-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-flat"
                      >
                        Add User
                      </button>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
