import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FallingLines } from "react-loader-spinner";

export default function Categories() {
  const [allCategories, setAllCategories] = useState(null);
  function getAllCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setAllCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getAllCategories();
  }, []);

  if (!allCategories) {
    return (
      <div className="d-flex bg-white bg-opacity-100 justify-content-center align-items-center vh-100">
        <FallingLines
          color="#0aad0a"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Catogries</title>
      </Helmet>
      <div className="container my-5 text-center ">
      <h1 className="text-main  fw-bold">All Categories</h1>
        <div className="row g-4 mt-3">
          {allCategories.map((item, index) => {
            return (
              <div key={index} className="col-md-4 text-center   ">
                <div className="category  p-3 ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-100 "
                    style={{
                      height: "300px",
                      objectPosition: "center",
                      objectFit: "cover",
                    }}
                  />
                  <h2 className="mt-2 text-main fw-bold">{item.name}</h2>
                  {/* <p>{item._id}</p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
