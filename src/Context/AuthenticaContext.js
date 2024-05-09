import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext();
export default function AuthenticaContextProvider({ children }) {
  const [DecodeUserData, setDecodeUserData] = useState(null);
  const [token, settoken] = useState(null);

  function getUserData() {
    const userData = jwtDecode(localStorage.getItem("token"));
    setDecodeUserData(userData);
  }

  // to Handle The Refresh we use the use effect as the component will be rendered as if the first time
  useEffect(function () {
    //<--- once this func is emplemented that's means that the refresh happened
    const val = localStorage.getItem("token");
    if (val !== null) {
      settoken(val);
      getUserData()
    }
  }, []);

  return (
    <authContext.Provider
      value={{
        myToken: token,
        setToken: settoken,
        DecodeUserData,
        setDecodeUserData,
        getUserData,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
