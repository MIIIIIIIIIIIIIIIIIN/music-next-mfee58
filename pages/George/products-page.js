import React from 'react'
import ProductsLatestLaunched from '@/components/George/products-mall/products-latest-launched'
import Footer from '@/components/public/footer';
import ProductsRecommendation from '@/components/George/products-mall/products-recommendation';
import ProductsActivities from '@/components/George/products-mall/products-activities';

export default function ProductsPage() {
  return (
    <>
    <ProductsActivities/>
    <ProductsRecommendation />
    <ProductsLatestLaunched />
    <Footer />
    </>
  )
}
