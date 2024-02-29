import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Helmet } from "react-helmet";
import Slider from "react-slick";

export default function Category() {
  const [categoryList, setCategory] = useState([]);
  async function getCategory() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategory(data.data);
  }
  useEffect(() => {
    getCategory();
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <Slider {...settings}>
        {categoryList.map((category) => {
          return (
            <Fragment>
            <div >
              <img
                src={category.image}
                className="w-100"
                height={300}
                alt="category"
                
              />
              <p>{category.name}</p>
              </div>
            </Fragment>
          );
        })}
      </Slider>
    </div>
  );
}
