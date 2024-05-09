import axios from "axios";
import React, { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { wishListContext } from "../../Context/WishlistContext";

export default function Products() {
  // *---------------AddProduct To Cart-----------
  const { addProductToCart } = useContext(cartContext);
  async function addProduct(id) {
    const res = await addProductToCart(id);
    if (res) {
      console.log("YESSSSSSSSSSSSSSSSSSSSSSSS");
      console.log(res);
      toast.success("product added sucsseddfully", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "green", color: "white" },
      });
    } else {
      console.log("NOOOOOOOOOOOOOOOOOOOO");
      toast.error("oops! can't add product ", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "red", color: "white" },
      });
    }
  }
  console.log(addProductToCart);
  // *---------------AddProduct To Wish List-----------
  const { addProductToWishList } = useContext(wishListContext);
  async function addToWishList(id) {
    const res = await addProductToWishList(id);
    console.log("rererereeree",res)
    if (res) {
      console.log("YESSSSS  wish ");
      console.log(res);
      toast.success("product added sucsseddfully to wish list", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "green", color: "white" },
      });
    } 
    else {
      console.log("NOOOOOOOO wish " , res);
      toast.error("oops can't add product to wish list", {
        duration: 2000,
        position: "top-center",
        style: { marginTop: "50px", backgroundColor: "red", color: "white" },
      });
    }
  }

  //& ------WITHOUT USING USEQUERY------
  // const [allProducts, setallProducts] = useState(null);
  // async function getAllProducts() {
  //   axios
  //     .get("https://ecommerce.routemisr.com/api/v1/products")
  //     .then((resolved) => {
  //       console.log(resolved.data.data);
  //       setallProducts(resolved.data.data);
  //     })
  //     .catch((rejected) => {
  //       console.log("Error", rejected);
  //     });
  // }

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  //& ------ USING USEQUERY------
  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts);
  console.log(isLoading);
  console.log(data?.data.data);

  if (isLoading) {
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
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container py-3">
        <div className="row mb-4">
          <div className="col-md-9">
            <SimpleSlider />
          </div>
          <div className="col-md-3">
            <div>
              <img
                src={require("../../images/grocery-banner-2.jpeg")}
                alt=""
                className="w-100"
                style={{ height: "150px" }}
              />
            </div>
            <div>
              <img
                src={require("../../images/grocery-banner.png")}
                alt=""
                className="w-100"
                style={{ height: "150px" }}
              />
            </div>
          </div>
        </div>

        <div className="row ">
          <h5>Shop Popular Categories</h5>
          <CategorySlider />
        </div>

        <div className="row gy-3 mt-4">
          {data.data.data.map((product, index) => {
            return (
              <div
                key={index}
                className="products col-md-2  p-2 overflow-hidden"
                role="button"
              >
                <Link to={`/productDetails/${product.id}`}>
                  <div className="product p-2">
                    <img src={product.imageCover} alt="" className="w-100" />
                    <h3 className="h6 text-main mt-1">
                      {product.category.name}
                    </h3>
                    <h2 className="h5 fw-bold">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>

                    <div className="d-flex justify-content-between ">
                      {product.priceAfterDiscount ? (
                        <p>
                          {" "}
                          <span className="text-decoration-line-through text-danger">
                            {product.price}
                          </span>{" "}
                          - {product.priceAfterDiscount} EGP
                        </p>
                      ) : (
                        <p>{product.price} EGP</p>
                      )}
                      <p>
                        {" "}
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#FFD43B" }}
                        ></i>{" "}
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product.id)}
                  className="addBtn btn bg-main text-white mt-2 m-auto d-block "
                >
                  +
                </button>
                <button
                  onClick={() => addToWishList(product.id)}
                  className="heartBtn "
                >
                  <i className="fa-solid fa-heart fa-xl text-main "></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
