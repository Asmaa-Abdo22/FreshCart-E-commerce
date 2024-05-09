import React, { useContext } from "react";
import { authContext } from "../../Context/AuthenticaContext";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { DecodeUserData } = useContext(authContext);
  return (
    <>
    <Helmet>
      <title>
        Profile
      </title>
    </Helmet>
      <div className="w-50 m-auto mt-5  bg-main text-white text-center p-4 d-flex flex-column ">
        <i className="fa-regular fa-user fa-2xl text-white"></i>
        <h5 className="mt-4"> User Name : {DecodeUserData?.name}</h5>
      </div>
    </>
  );
}
