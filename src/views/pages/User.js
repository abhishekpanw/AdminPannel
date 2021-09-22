import React, { useEffect, useState } from "react";
import { useModal } from "react-hooks-use-modal";
import axios from "axios";
import { useFormik } from "formik";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const User = () => {
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [data, setdata] = useState([]);
  const [user, setuser] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((res) => {
      setdata(res.data);
      console.log(res.data);
    });
  }, []);

  {
    /*================================= Delete User ======================================== */
  }

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

  {
    /*================================= Add User ======================================== */
  }

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
            setdata((prev) => {
              return [...prev, res.data];
            });
            resetForm({});
            close();
            toast.success("User Added Successfully", {
              theme: "colored",
            });
          });
      } catch (err) {
        toast.error("User not Added", {
          theme: "colored",
        });
      }
    },
  });

  {
    /*================================= Edit User ======================================== */
  }

  const editUser = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(false);
        console.log("User++++++++++++++==", user);
        await axios
          .put(`http://localhost:5000/users/${user._id}`, values)
          .then((res) => {
            console.log(res.data);
          });
        await axios.get(`http://localhost:5000/users/`, values).then((res) => {
          console.log(res.data);
          setdata(res.data);
          resetForm({});

          toast.success("User Edit Successfully", {
            theme: "colored",
          });
        });
      } catch (err) {
        toast.error("User not Edited", {
          theme: "colored",
        });
      }
    },
  });

  const onEdit = (id) => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => {
      console.log(res.data);
      setuser(res.data);
      editUser.setFieldValue("fullName", res.data.fullName);
      editUser.setFieldValue("email", res.data.email);
    });
  };

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
              onClick={open}
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
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          class="btn btn-success"
                          data-toggle="modal"
                          data-target="#modal-success"
                          onClick={() => onEdit(user._id)}
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
        <Modal>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={close}>
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
                      <div className="pull-left">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block btn-flat"
                        >
                          Add User
                        </button>
                      </div>
                      <div className="pull-right">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block btn-flat"
                          onClick={close}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
};

export default User;
