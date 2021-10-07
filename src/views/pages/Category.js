import React, { useState, useEffect } from "react";
import Header from "../Layouts/Header";
import Sidebar from "../Layouts/Sidebar";
import { useModal } from "react-hooks-use-modal";
import { useFormik } from "formik";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Toggle from "react-toggle";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./button.css";

function Category() {
  const [data, setdata] = useState([]);
  const [modaltype, setmodaltype] = useState();

  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const openmodal = (modaltype) => {
    open();
    setmodaltype(modaltype);
  };
  const [user, setuser] = useState({
    _id: "",
    title: "",
    image: "",
    status: "",
  });

  useEffect(() => {
    try {
      axios.get("http://localhost:5000/allcategory").then((res) => {
        setdata(res.data.user);
        console.log(res.data.user);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  {
    /*========================================== Add Category ================================ */
  }
  const addCategory = useFormik({
    initialValues: {
      title: "",
      image: "",
      status: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      image: Yup.mixed().required("Required"),
    }),

    onSubmit: async ({ title, image, status }) => {
      try {
        var formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("status", status);

        const Option = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        await axios
          .post("http://localhost:5000/addcategory", formData)
          .then((res) => {
            setdata((prev) => {
              return [...prev, res.data];
            });
            close();
            toast.success("User Added Successfully", {
              theme: "colored",
            });
          });
      } catch (err) {
        toast.error(err.response.data.message);
      }
    },
  });
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
        axios
          .delete(`http://localhost:5000/deleteCategory/${id}`)
          .then((res) => {
            setdata(data.filter((i) => i._id !== id));
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  {
    /*========================================== Edit Category ================================ */
  }
  const editCategory = useFormik({
    initialValues: user,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      image: Yup.mixed().required("Required"),
    }),

    onSubmit: async ({ title, image, status }) => {
      try {
        var formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("status", status);

        await axios
          .put(`http://localhost:5000/updateCategory/${user._id}`, formData)
          .then((res) => {});
        await axios.get(`http://localhost:5000/allcategory`).then((res) => {
          console.log(res.data);
          setdata(res.data.user);
          close();
          toast.success("User Edit Successfully", {
            theme: "colored",
          });
        });
      } catch (err) {
        toast.error(err.response.data.message, { theme: "colored" });
      }
    },
  });

  const onEdit = (id) => {
    axios.get(`http://localhost:5000/getcategory/${id}`).then((res) => {
      setuser(res.data);
      editCategory.setFieldValue("title", res.data.title);
      openmodal("edit");
    });
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="box">
          <div className="box-header">
            <h3 className="box-title" style={{ fontSize: "22px" }}>
              Category
            </h3>
            <i
              class="fa fa-user-plus"
              aria-hidden="true"
              onClick={() => openmodal("add")}
              style={{
                float: "right",
                padding: "0px 42px 2px",
                fontSize: "41px",
                cursor: "pointer",
              }}
            ></i>
          </div>

          <div class="box-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              {data.map((elem) => {
                return (
                  <tbody>
                    <tr>
                      <td>{elem.title}</td>
                      <td>
                        <img
                          src={`http://localhost:5000/images/${elem.image}`}
                          style={{ width: "80px" }}
                        />
                      </td>
                      <td>
                        <h4>
                          {elem.status ? (
                            <button
                              style={{
                                fontSize: "17px",
                                backgroundColor: "green",
                                color: "white",
                                padding: "5px",
                                width: "76px",
                                textAlign: "center",
                                margin: "0px",
                                borderRadius: "20px",
                              }}
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              style={{
                                fontSize: "17px",
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px",
                                width: "76px",
                                textAlign: "center",
                                margin: "0px",
                                borderRadius: "20px",
                              }}
                            >
                              Inactive
                            </button>
                          )}
                        </h4>
                      </td>
                      <td>
                        <i
                          style={{
                            fontSize: "27px",
                            marginRight: "11px",
                            cursor: "pointer",
                          }}
                          class="fa fa-pencil-square-o"
                          aria-hidden="true"
                          onClick={() => onEdit(elem._id)}
                        ></i>

                        <i
                          style={{ fontSize: "27px", cursor: "pointer" }}
                          class="fa fa-trash"
                          onClick={() => deleteAlert(elem._id)}
                          aria-hidden="true"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              //   pageCount={pageCount}
              //onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
        {/*================================= Add Category ======================================== */}
        {modaltype == "add" ? (
          <Modal>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={close}>
                    <span aria-hidden="true">×</span>
                  </button>
                  <h4 className="modal-title">Add Category</h4>
                </div>
                <div
                  className="modal-body"
                  style={{
                    height: "286px",
                    backgroundColor: "#d0d5d6 !important",
                  }}
                >
                  <form onSubmit={addCategory.handleSubmit}>
                    <div className="form-group has-feedback">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        id="title"
                        name="title"
                        onChange={addCategory.handleChange}
                        onBlur={addCategory.handleBlur}
                        value={addCategory.values.title}
                      />
                      {addCategory.touched.title && addCategory.errors.title ? (
                        <div style={{ color: "red" }}>
                          {addCategory.errors.title}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-user form-control-feedback" />
                    </div>
                    <div className="form-group has-feedback">
                      <input
                        type="file"
                        className="form-control"
                        placeholder="file"
                        id="image"
                        name="image"
                        onChange={(e) => {
                          addCategory.setFieldValue("image", e.target.files[0]);
                        }}
                        onBlur={addCategory.handleBlur}
                        value={addCategory.values.file}
                      />
                      {addCategory.touched.file && addCategory.errors.file ? (
                        <div style={{ color: "red" }}>
                          {addCategory.errors.file}
                        </div>
                      ) : null}
                      <span className="glyphicon glyphicon-envelope form-control-feedback" />
                    </div>
                    <select
                      style={{
                        marginBottom: "15px",
                        width: "165px",
                        fontSize: "14px",
                        padding: "4px",
                        borderRadius: "5px",
                      }}
                      id="status"
                      name="status"
                      className="form-control"
                      onChange={addCategory.handleChange}
                      value={addCategory.values.status}
                      onBlur={addCategory.handleBlur}
                    >
                      <option>Please Select Status</option>
                      <option value="1">true</option>
                      <option value="0">false</option>
                    </select>
                    <>
                      <div className="col-xs-4">
                        <div className="pull-left">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block btn-flat"
                          >
                            Add Category
                          </button>
                        </div>
                      </div>
                    </>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
        {/*================================= Edit Category ======================================== */}
        {modaltype == "edit" ? (
          <Modal>
            <div>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={close}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                    <h4 className="modal-title">Edit Form</h4>
                  </div>
                  <div className="modal-body" style={{ height: "286px" }}>
                    <form onSubmit={editCategory.handleSubmit}>
                      <div className="form-group has-feedback">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Title"
                          id="title"
                          name="title"
                          onChange={editCategory.handleChange}
                          onBlur={editCategory.handleBlur}
                          value={editCategory.values.title}
                        />
                        {editCategory.touched.title &&
                        editCategory.errors.title ? (
                          <div style={{ color: "red" }}>
                            {editCategory.errors.title}
                          </div>
                        ) : null}
                        <span className="glyphicon glyphicon-user form-control-feedback" />
                      </div>
                      <div className="form-group has-feedback">
                        <input
                          type="file"
                          className="form-control"
                          placeholder="image"
                          id="image"
                          name="image"
                          onChange={(e) => {
                            editCategory.setFieldValue(
                              "image",
                              e.target.files[0]
                            );
                          }}
                          onBlur={editCategory.handleBlur}
                        />

                        {editCategory.touched.image &&
                        editCategory.errors.image ? (
                          <div style={{ color: "red" }}>
                            {editCategory.errors.image}
                          </div>
                        ) : null}
                        <span className="glyphicon glyphicon-envelope form-control-feedback" />
                      </div>
                      <select
                        style={{
                          marginBottom: "15px",
                          width: "165px",
                          fontSize: "14px",
                          padding: "4px",
                          borderRadius: "5px",
                        }}
                        id="status"
                        name="status"
                        className="form-control"
                        onChange={editCategory.handleChange}
                        value={editCategory.values.status}
                        onBlur={editCategory.handleBlur}
                      >
                        <option>Please Select Status</option>
                        <option value="1">true</option>
                        <option value="0">false</option>
                      </select>
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
          </Modal>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Category;
