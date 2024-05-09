import React, { useContext } from "react";
import { wishListContext } from "../../Context/WishlistContext";
import { FallingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function WishList() {
  const { allWishlist, deleteWishItem } = useContext(wishListContext);

  async function deleteItem(id) {
    const res = await deleteWishItem(id);
    if (res) {
      console.log(res);
      toast.success("Deleted sucsseddfully", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "green", color: "white" },
      });
    } else {
      toast.error("oops can't delete product", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "red", color: "white" },
      });
    }
  }

  if (!allWishlist) {
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
      {allWishlist.length === 0 ? (
        <h1 className="bg-main text-white w-50 mt-5 text-center p-5 m-auto">
          Your Wish List is Empty
          <br />{" "}
          <Link
            className="text-white h6 text-decoration-underline"
            to={"/products"}
          >
            {" "}
            Add some products to wish list
          </Link>
        </h1>
      ) : (
        <div className="container my-5 bg-body-tertiary">
          <h1 className="fw-bold p-3"> My Wish List </h1>

          {allWishlist.map((item, index) => {
            return (
              <div className="row p-4 mt-3 border-1 border-bottom border-muted">
                <div className="col-md-3" style={{ width: "250px" }}>
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-100"
                  />
                </div>
                <div className="col-md-9 d-flex justify-content-between align-items-center ">
                  <div className="text-left">
                    <h4 className="mt-3">{item.title}</h4>
                    <h6 className="text-main">{item.price} EGP</h6>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteItem(item._id)}
                    >
                      Remove{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
