import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  async function getAllBrands() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
  }
  const { data, isLoading } = useQuery("getAllPrands", getAllBrands);

  console.log(data?.data);

  if (isLoading) {
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
        <title>Brands</title>
      </Helmet>
      <div className="container text-center my-4">
        <h1 className="text-main pt-3 fw-bold">All Brands</h1>
        <div className="row g-4 mt-3">
          {data.data.data.map((brand, index) => (
            <div key={index} className="col-md-3">
              <div className="brand text-center">
                <img src={brand.image} alt={brand.name} className="w-100" />
                <h4>{brand.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
