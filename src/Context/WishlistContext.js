import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthenticaContext";
export const wishListContext = createContext();
export default function WishlistContextProvider({ children }) {
  const [allWishlist, setallWishlist] = useState(null);
  const { myToken } = useContext(authContext);
 async function addProductToWishList(productId) {
  const res = await axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/wishlist`,
        { productId: productId },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        console.log("res from wishlist context", res.data);
        setallWishlist(res.data.data);
        
        return true;
      })
      .catch((error) => {
        console.log(error);
        console.log("error from wishlist context", error.data);
        return false;
      });
      return res;
  }

  function getallWishlist() {
    axios
      .get(`https://route-ecommerce.onrender.com/api/v1/wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("res from getall wish list", res.data);
        setallWishlist(res.data.data);
        console.log(res.data.data);
        // setWishItemId(res.data.data._id)
      })
      .catch((error) => {
        console.log("error from get all wish list", error);
      });
  }
  useEffect(() => {
    getallWishlist();
  }, [myToken]);

async  function deleteWishItem(id) {
    const res= await axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${id}`,{
        headers: {
            token: localStorage.getItem("token"),
          },
    }).then((res)=>{
        console.log(res)
        setallWishlist(res.data.data);
        return true;
    }).catch((error)=>{
        console.log(error)
        return false;
    })
    return res;
  }
  return (
    <wishListContext.Provider
      value={{ addProductToWishList, allWishlist, setallWishlist ,deleteWishItem}}
    >
      {children}
    </wishListContext.Provider>
  );
}
