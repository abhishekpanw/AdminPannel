import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const VerifyEmail = (props) => {
  const history = useHistory();

  useEffect(() => {
    verifyemail();
  }, []);

  const verifyemail = async () => {
    try {
      await axios
        .post(`http://localhost:5000/accountverify/${props.match.params.token}`)
        .then((res) => {
          if (res.data.success == true) {
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("user", JSON.stringify(res.data.user));
            history.push("/");
          }
        });
    } catch (error) {}
  };

  return (
    <div>
      <h1>Account Verified</h1>
    </div>
  );
};

export default VerifyEmail;
