import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthenticaContext";
import { Helmet } from "react-helmet";
const mySchema = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
});
export default function Login() {
  let userData = {
    email: "",
    password: "",
  };
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setToken, getUserData } = useContext(authContext);
  async function mySubmit(values) {
    setIsLoading(true);
    console.log(values);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(function (resolved) {
        if (resolved.data.message === "success") {
          console.log("success", resolved);
          localStorage.setItem("token", resolved.data.token);
          setToken(resolved.data.token);
          getUserData()
          console.log(resolved.data.token);
          setIsLoading(false);
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("/products");
          }, 2000);
        }
      })
      .catch(function (rejected) {
        setIsLoading(false);
        console.log("error", rejected);
        setErrorMessage(rejected.response.data.message);
        setTimeout(() => {
          setErrorMessage(undefined);
        }, 2000);
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
        Login 
      </title>
    </Helmet>
      <div className="w-75 p-5 m-auto">
        {isSuccess ? (
          <div className="alert alert-success text-center">
            Welcome to FreshCart{" "}
          </div>
        ) : (
          ""
        )}
        {errorMessage ? (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        ) : undefined}
        <h2 className="fw-bold">Log In :</h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">Email : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            type="email"
            name="email"
            id="email"
            className="form-control mb-3"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password : </label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            type="password"
            name="password"
            id="password"
            className="form-control mb-3"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}
          <button type="submit" className="btn bg-main text-light">
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
              "login "
            )}
          </button>
        </form>
      </div>
    </>
  );
}
