import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
function Charts() {
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

  const state = {
    labels: ["User", "Category", "SubCategory", "Product"],
    datasets: [
      {
        label: "Count",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [user, category, Subcount, Product],
      },
    ],
  };
  return (
    <div style={{ width: "700px" }}>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}
export default Charts;
