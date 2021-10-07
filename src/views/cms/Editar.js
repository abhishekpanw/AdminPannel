import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "../Layouts/Header";
import axios from "axios";
import Sidebar from "../Layouts/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Edit.css";

function Editor() {
  const [data, setdata] = useState();
  const [id, setId] = useState();
  const [text, setText] = useState();

  const aboutUs = () => {
    try {
      axios
        .get("http://localhost:5000/getabout/6153169a2001b0e989ec570b")
        .then((res) => {
          setdata(res.data.description);
          setId(res.data._id);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  const contactUs = () => {
    try {
      axios
        .get("http://localhost:5000/getcontact/6153f3fe75404d14978250ff")
        .then((res) => {
          setdata(res.data.description);
          setId(res.data._id);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  const termCondition = () => {
    try {
      axios
        .get("http://localhost:5000/getterm/615318252001b0e989ec5733")
        .then((res) => {
          setdata(res.data.description);
          setId(res.data._id);
        });
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    aboutUs();
  }, []);

  const updateAlldata = () => {
    try {
      axios.put(`http://localhost:5000/update/${id}`, { text }).then((res) => {
        setdata(data);
        toast.success("CMS Added Successfully", {
          theme: "colored",
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeEditor = (event, editor) => {
    const data = editor.getData();
    setText(data);
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="style">
          <button type="submit" class="btn btn-success" onClick={aboutUs}>
            About Us
          </button>
          <button type="submit" class="btn btn-primary" onClick={contactUs}>
            Contact Us
          </button>
          <button type="submit" class="btn btn-danger" onClick={termCondition}>
            Terms and Conditions
          </button>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            onChangeEditor(event, editor);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <button type="submit" class="btnn pull-right" onClick={updateAlldata}>
          Update
        </button>
        <ToastContainer />
      </div>
    </>
  );
}

export default Editor;
