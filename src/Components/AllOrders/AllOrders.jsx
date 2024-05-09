import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FallingLines } from "react-loader-spinner";
export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  function getUserOrders() {
    const userID = localStorage.getItem("cartOwner");
    console.log(userID);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      .then((res) => {
        console.log(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  if (!allOrders) {
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
      <title>
       All Orders
      </title>
    </Helmet>
      <div className="container mt-5">
        <div className="row">
          {allOrders.map((order, index) => {
            console.log("order", order);
            return (
              <div className="col-md-6 mb-3 " key={index}>
                <div className="order border-1 border-white   bg-grad h-100 p-3 m-2 ">
                  <div className="container">
                    <div className="row">
                      {order.cartItems.map((item, itemIndex) => {
                        return (
                          <div key={itemIndex} className="col-md-4">
                            <div className="item cardImg">
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-100 mb-2 "
                              />
                              <h5 className="fw-bold">{item.product.title.split(" ").slice(0, 2).join(" ")}</h5>
                              <h5> Count :{item.count}</h5>
                              <h5>Price :{item.price}</h5>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <h5 className="border-1 border-top  border-success mt-3 pt-2">
                    payment Method : {order.paymentMethodType}
                  </h5>
                  <h5>order Price : {order.totalOrderPrice} </h5>
                  <p>
                    This order is delivered to : {order.shippingAddress.city}
                  </p>
                  <p>phone Number : {order.shippingAddress.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
