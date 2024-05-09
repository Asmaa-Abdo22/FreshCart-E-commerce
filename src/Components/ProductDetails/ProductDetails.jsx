import axios from "axios";
import React, { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  const { id } = useParams();
  async function addProduct(id) {
  
    const res = await addProductToCart(id);
    if (res) {
     console.log("YESSSSSSSSSSSSSSSSSSSSSSSS")
     console.log(res);
     toast.success("product added sucsseddfully", {
       duration: 2000,
       position: "top-center",
       style: { marginTop: "50px", backgroundColor: "green", color: "white" },
     });
   } else {
     console.log("NOOOOOOOOOOOOOOOOOOOO")
     toast.error("oops! can't add product ", {
       duration: 2000,
       position: "top-center",
       style: { marginTop: "50px", backgroundColor: "red", color: "white" },
     });
   }
    // console.log("response", res)
    // if(res.status === "success"){
    //   toast.success(res.message, {duration:2000, position:"top-center"})
    // }else{
    //   toast.error(res.message, {duration:2000, position:"top-center"})
    // }
  }
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  const { data, isLoading, isError } = useQuery(
    `productDetails-${id}`,
    getProductDetails
  );
  console.log(data);

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
  if (isError) {
    return <Navigate to={"/*"} />;
  }
  const productDetails = data.data.data;
  return (
    <>
    <Helmet>
      <title>
        {productDetails.title.split(" ").slice(0, 2).join(" ")}
      </title>
    </Helmet>
      <div className="container my-5 ">
        <div className="row  align-items-center justify-content-center">
          <div className="col-md-3">
            <figure>
              <img
                src={productDetails.imageCover}
                alt={productDetails.title}
                className="w-100"
              />
            </figure>
          </div>
          <div className="col-md-9 p-4">
            <article>
              <h2 className="fw-bold">{productDetails.title}</h2>
              <p className="text-muted">{productDetails.description}</p>
              <span>{productDetails.category.name}</span>
              <div className="d-flex justify-content-between   my-1 align-items-center">
                <span className="fw-bolder">
                  {" "}
                  Price : {productDetails.price} EGP
                </span>

                <span>
                  {" "}
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "#FFD43B" }}
                  ></i>
                  {productDetails.ratingsAverage}{" "}
                </span>
              </div>
              {/* <p className="w-25  m-auto">{productDetails.id}</p> */}
              <button
                onClick={() => addProduct(productDetails.id)}
                className=" bg-main text-white btn w-100 mt-3"
              >
                + Add to cart
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
