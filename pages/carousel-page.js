import React from "react";
<<<<<<< HEAD
import Carousel from "@/components/public/carousel"; // 確保路徑正確
=======
import Carousel from "../components/public/Carousel"; // 確保路徑正確
>>>>>>> Liam

const images = [
  "/prodcuts-images-250px/products-1.jpg",
  "/prodcuts-images-250px/products-2.jpg",
  "/prodcuts-images-250px/products-3.jpg",
  "/prodcuts-images-250px/products-4.jpg",
  "/prodcuts-images-250px/products-5.jpg",
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
