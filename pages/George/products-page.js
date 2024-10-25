import React from 'react'
import ProductsCarousel from '@/components/George/products-mall/products-carousel'
import Footer from '@/components/public/footer';

const images = [
  "/George/products (1).jpg",
  "/George/products (2).jpg",
  "/George/products (3).jpg",
  "/George/products (4).jpg",
  "/George/products (5).jpg",
];

export default function ProductsPage() {
  return (
    <>
    <ProductsCarousel images={images} interval={2500}/>
    {/* <Footer /> */}
    </>
  )
}
