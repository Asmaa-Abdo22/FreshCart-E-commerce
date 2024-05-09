import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthenticaContext";
export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, settotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const { myToken } = useContext(authContext);
  const [cartId, setCartId] = useState(null)
  console.log("Cart ID ",cartId)
  // &-----------addProductToCart--------------
  // async function addProductToCart(productId) {
  //   try {
  //     const res = await axios.post(
  //       "https://ecommerce.routemisr.com/api/v1/cart",
  //       {
  //         productId: productId,
  //       },
  //       {
  //         headers: {
  //           token: localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     setAllProducts(res.data.data.products);
  //     setNumOfCartItems(res.data.numOfCartItems);
  //     settotalCartPrice(res.data.data.totalCartPrice);
  //     return true;
  //     // return data;
  //   } catch (e) {
  //     console.log("error", e);
  //     return false;
  //   }

  // }

  async function addProductToCart(id) {
    const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        { headers: { token: localStorage.getItem("token") } }
      )
      // console.log(res.data)
      .then((res) => {
        console.log(res.data);
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        settotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return response;
  }

  // &-----------getUserCart--------------
  async function getUserCart() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("response:>", response.data);
        setCartId(response.data.data._id)
        localStorage.setItem("cartOwner", response.data.data.cartOwner)
        setAllProducts(response.data.data.products);
        setNumOfCartItems(response.data.numOfCartItems);
        settotalCartPrice(response.data.data.totalCartPrice);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // we used my token as when the user loged out, the useEffect will also implemented when the app starts because
  // the cartContext is emelemented every time when the app atarts , so if the user loged out myToken will be null
  // but when he log in myToken will have the user token so the function  getUserCart will implement
  useEffect(() => {
    getUserCart();
  }, [myToken]);

  // &-----------updateCount--------------
  async function updateCount(id, newCount) {
    const booleanFlag = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: newCount },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        settotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return booleanFlag;
  }

  // &-----------DeleteItem--------------
  async function deleteProduct(id) {
    const res = await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(" response form delete func at cartcontext", res);
        settotalCartPrice(res.data.data.totalCartPrice);
        setAllProducts(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        return true;
      })
      .catch((err) => {
        console.log(" error form delete func at cartcontext", err);
        return false;
      });
    return res;
  }
  // &-----------clearCart--------------
  async function clearCart() {
    const res = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        settotalCartPrice(0);
        setAllProducts([]);
        setNumOfCartItems(0);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
    return res;
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        allProducts,
        updateCount,
        deleteProduct,
        clearCart,
        cartId,
        getUserCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
