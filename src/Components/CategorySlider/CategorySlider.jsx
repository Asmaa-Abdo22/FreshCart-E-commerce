import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("categorySlider", getCategories);
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
    <Slider {...settings}>
      {data.data.data.map((category, index) => (
        <div className="mt-1" key={index}>
          <img
            style={{ height: "200px" }}
            className="w-100"
            src={category.image}
            alt={category.name}
          />
          <h6 className="mt-2 text-center">{category.name}</h6>
        </div>
      ))}
    </Slider>
  );
}
