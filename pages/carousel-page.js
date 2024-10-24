import React from "react";
import Carousel from "../components/Carousel"; // 確保路徑正確

const images = [
  "/image/001album.jpg",
  "/image/002album.jpg",
  "/image/003album.jpg",
  "/image/004album.jpg",
  "/image/005album.jpg",
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
