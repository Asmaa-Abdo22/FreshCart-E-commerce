import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { FallingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { updateCount, totalCartPrice, allProducts, deleteProduct, clearCart } =
    useContext(cartContext);
  // &--------------LOADING SCREEN---------------
  if (!allProducts) {
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
  // &--------------updateProductCount---------------
  async function updateProductCount(id, newCount) {
    const res = await updateCount(id, newCount);
    if (res) {
      console.log(res);
      toast.success("count updated sucsseddfully", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "green", color: "white" },
      });
    } else {
      toast.error("oops! can't update product count", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "red", color: "white" },
      });
    }
  }
  // &--------------DELETEProduct---------------
  async function deleteCartItem(id) {
    const res = await deleteProduct(id);
    if (res) {
      console.log(res);
      toast.success("Deleted sucsseddfully", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "green", color: "white" },
      });
    } else {
      toast.error("oops! can't delete product count", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "red", color: "white" },
      });
    }
  }
  return (
    <>
    <Helmet>
      <title>
        Cart
      </title>
    </Helmet>
      {allProducts.length === 0 ? (
        <h1 className="bg-main text-white w-50 mt-5 text-center p-5 m-auto">
          Your Cart is Empty
          <br />{" "}
          <Link
            className="text-white h6 text-decoration-underline"
            to={"/products"}
          >
            {" "}
            Buy some products
          </Link>
        </h1>
      ) : (
        <div className="container mt-3 bg-main-light p-4">
          <h1>Shop Cart </h1>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div>
              <h4 className="text-main">
                Total Cart Price {totalCartPrice} EGP
              </h4>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Link to={"/payment"}>
                <button className="btn bg-main text-white  me-3">
                  start order{" "}
                </button>
              </Link>
              <button onClick={clearCart} className="btn bg-danger text-white ">
                Clear Cart{" "}
              </button>
            </div>
          </div>

          {allProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="row border-1 border-bottom border-muted mt-4 align-items-center"
              >
                <div className="col-md-1">
                  <figure>
                    <img
                      src={product.product.imageCover}
                      alt={product.product.title}
                      className="w-100"
                    />
                  </figure>
                </div>
                <div className="col-md-9 text-left">
                  <h4>{product.product.title}</h4>
                  <h5 className="text-main">price: {product.price}</h5>
                  <button
                    onClick={() => deleteCartItem(product.product._id)}
                    className="btn btn-outline-danger m-2"
                  >
                    Remove
                  </button>
                  {/* <br />
                  1: {product._id}
                  <br />
                  2: {product.product._id} */}
                </div>
                <div className="col-md-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      onClick={() =>
                        updateProductCount(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="btn bg-main text-white m-2"
                    >
                      +
                    </button>
                    <p className="h5">{product.count}</p>
                    <button
                      disabled={product.count === 1}
                      onClick={() =>
                        updateProductCount(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="btn bg-main text-white m-2"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
