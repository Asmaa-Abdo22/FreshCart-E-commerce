import React from "react";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import AuthenticaContextProvider from "./Context/AuthenticaContext";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import AllOrders from "./Components/AllOrders/AllOrders";
import Profile from "./Components/Profile/Profile";
import { Offline } from "react-detect-offline";
import Brands from "./Components/Brands/Brands";
import WishlistContextProvider from "./Context/WishlistContext";
import WishList from "./Components/WishList/WishList";

const myRouter = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishList",
        element: (
          <ProtectedRoute>
            {" "}
            <WishList />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "Brands",
        element: (
          <ProtectedRoute>
            {" "}
            <Brands />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            {" "}
            <Payment />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            {" "}
            <AllOrders />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            {" "}
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },

      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthenticaContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <RouterProvider router={myRouter} />
            </WishlistContextProvider>
          </CartContextProvider>
        </AuthenticaContextProvider>
      </QueryClientProvider>
      <Offline>
        <div className=" bg-danger m-auto text-white p-3 position-fixed top-50 ">
          {" "}
          oops , Maybe There Is a problem with your Network
        </div>
      </Offline>
      <Toaster />
    </>
  );
}
