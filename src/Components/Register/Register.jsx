import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const mySchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "at least 3 characters")
    .max(20, "name must be less than 20 char"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required "),
  phone: yup.string().required("phone is required "),
  password: yup.string().required("required"),
  rePassword: yup
    .string()
    .required("this field is required")
    .oneOf([yup.ref("password")], "password and repassword must match"),
});

export default function Register() {
  let userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function mySubmit(values) {
    setIsLoading(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(function (x) {
        // x is the response from api
        console.log("success", x);
        // console.log(x.response.data.message);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/login");
        }, 2000);
        setIsLoading(false);
      })
      .catch(function (x) {
        console.log("erorrr", x);
        setErrorMessage(x.response.data.message);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 2000);
        setIsLoading(false);
      });
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: mySubmit,
    // validate : function(values){
    //   const error= {}
    //   const nameregex = /^[A-Z][a-z]{3,7}$/
    //   const phoneRegex = /^01[1250][0-9]{8}$/
    //   if(nameregex.test(values.name) === false){
    //     error.name = "Name must be from 3 to 7 letters and start with capital letter"
    //   }
    //   if(values.email.includes("@") ===false || values.email.includes(".")===false){
    //     error.email ="Email must include @ and ."
    //   }
    //  if(phoneRegex.test(values.phone)===false){
    //   error.phone= "phone must be 11 numbers"
    //  }
    //  if(values.password.length < 6 || values.password.length > 12 ){
    //   error.password= "password must be from 6 to 12 character "
    //  }
    //  if(values.repassword !== values.password){
    //   error.repassword="password and repassword don't match "
    //  }
    //  console.log(error)
    //   return error;
    // }
    validationSchema: mySchema,
  });

  return (
    <>
    <Helmet>
      <title>
        Register
      </title>
    </Helmet>
      <div className="w-75 m-auto  p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center  mb-3 ">
            Your account has been added
          </div>
        ) : (
          " "
        )}
        {errorMessage ? (
          <div className="alert alert-danger text-center mb-3">
            {errorMessage}
          </div>
        ) : (
          ""
        )}

        <h2 className="fw-bold">Register Now : </h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name"> name : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            type="text"
            id="name"
            className="form-control mb-2"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger">{myFormik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email"> email : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="email"
            id="email"
            className="form-control mb-2"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password"> password : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
            id="password"
            className="form-control mb-2"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword"> rePassword : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.rePassword}
            type="password"
            id="rePassword"
            className="form-control mb-2"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {myFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone"> phone : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            type="text"
            id="phone"
            className="form-control mb-2"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}
          <button type="submit" className=" btn bg-main text-light">
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
      
    </>
  );
}
