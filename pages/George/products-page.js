import React from 'react'
import ProductsLatestLaunched from '@/components/George/products-mall/products-latest-launched'
import Footer from '@/components/public/footer';
import ProductsRecommendation from '@/components/George/products-mall/products-recommendation';

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
    <ProductsRecommendation />
    <ProductsLatestLaunched />
    <Footer />
    </>
  )
}
