import axios from "axios";
import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Helmet } from "react-helmet";
const mySchema = yup.object({
  city: yup.string().required("city is required "),
  phone: yup.string().required("phone is required "),
  details: yup.string().required("details is required "),
});
export default function Payment() {
  const userData = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };
  const navigate = useNavigate();
  const { cartId, getUserCart } = useContext(cartContext);
  function mySubmit(values) {
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        userData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("response from payment jsx", res);
        toast.success("Payment Confirmed Sucsseddfully", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: "50px",
            backgroundColor: "green",
            color: "white",
          },
        });
        getUserCart();
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      })
      .catch((err) => {
        console.log("error from payment jsx", err);
        toast.error("oops! can't confirm payment ", {
          duration: 2000,
          position: "top-center",
          style: { marginTop: "50px", backgroundColor: "red", color: "white" },
        });
      });
  }
  function mySubmitOnline() {
    const userData2 = {
      shippingAddress: {
        details: document.getElementById("details").value,
        phone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
      },
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        userData2,
        {
          headers: { token: localStorage.getItem("token") },
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        console.log("response from payment jsx", res);
        window.open(res.data.session.url);
      })
      .catch((err) => {
        console.log("error from payment online jsx", err);
      });
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: mySubmit,
    validationSchema: mySchema,
  });

  return (
    <>
    <Helmet>
      <title>
        Payment 
      </title>
    </Helmet>
      <div className="w-50 m-auto mt-5">
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="city" className="mb-2">
            City :
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.city}
            type="text"
            name="city"
            id="city"
            className="form-control mb-2"
          />
          {myFormik.errors.city && myFormik.touched.city ? (
            <div className="alert alert-danger">{myFormik.errors.city}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone" className="mb-2">
            phone :
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            type="text"
            name="phone"
            id="phone"
            className="form-control mb-2"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="details" className="mb-2">
            details :
          </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.details}
            type="text"
            name="details"
            id="details"
            className="form-control"
          />
          {myFormik.errors.details && myFormik.touched.details ? (
            <div className="alert alert-danger">{myFormik.errors.details}</div>
          ) : (
            ""
          )}

          <button type="submit" className="btn bg-main mt-4 text-white">
            Cash Payment
          </button>
        </form>
        <button
          type="button"
          onClick={mySubmitOnline}
          className="btn bg-primary text-white mt-4 "
        >
          Online Payment
        </button>
      </div>
    </>
  );
}
