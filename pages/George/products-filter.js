import React, { useState, useEffect } from "react";
import ProductsGenres from "@/components/George/card";
import Nav from "@/components/public/nav";
import Footer from "@/components/public/footer";
import ListNewCard from "@/components/Liam/Fundraising-list/new";

export default function ProductsFilter() {
  const images = [
    { url: "/George/products-images-250px/products-(1).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(2).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(3).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(4).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(5).jpg", alt: "Image 1" },
    { url: "/George/products-images-250px/products-(6).jpg", alt: "Image 1" },
  
    // ... 更多圖片
  ];
  return (
    <>
      <div>
        <Nav />
        <ProductsGenres images={images} />
        <Footer />
      </div>
    </>
  );
}

