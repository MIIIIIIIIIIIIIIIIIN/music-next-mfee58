import React from "react";
import Carousel from "../components/public/Carousel"; // 確保路徑正確

const images = [
  "/George/products (1).jpg",
  "/George/products (2).jpg",
  "/George/products (3).jpg",
  "/George/products (4).jpg",
  "/George/products (5).jpg",
];

const CarouselPage = () => {
  return (
    <>
      <div>
        <h1>Carousel Example</h1>
        <Carousel images={images} interval={2000} />
      </div>


    </>
  );
};

export default CarouselPage;
