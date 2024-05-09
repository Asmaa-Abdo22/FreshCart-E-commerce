import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthenticaContext";
import { cartContext } from "../../Context/CartContext";
export default function Navbar() {
  const { myToken, setToken } = useContext(authContext);
  console.log("NAVBAR token ", myToken);
  const navigate = useNavigate();
  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/Login");
  }
  const { numOfCartItems } = useContext(cartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ">
        <div className="container">
          <NavLink className="navbar-brand" to="">
            <img src={logo} alt="Fresh Cart " />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {myToken ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/products"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories">
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Brands">
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/cart">
                    Cart
                  </NavLink>
                  <span class="position-absolute carLinktTop start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems ? numOfCartItems : ""}
                  </span>
                </li>
                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/wishList">
                    Wish List
                  </NavLink>
                  {/* <span class="position-absolute carLinktTop start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfCartItems ? numOfCartItems : ""}
                  </span> */}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allOrders">
                    AllOrders
                  </NavLink>
                </li>
              </ul>
            ) : (
              " "
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item ">
                <ul className="d-flex list-unstyled gap-3 me-3 ">
                  <li>
                    <i className="fa-brands fa-instagram"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-facebook"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-tiktok"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-youtube"></i>
                  </li>
                </ul>
              </li>
              {myToken ? (
                <>
                  <li className="ms-4 me-2">
                    <NavLink to={"/profile"}>
                      <i className="fa-solid fa-user"></i>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span onClick={logOut} role="button" className="nav-link">
                      Log out
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
