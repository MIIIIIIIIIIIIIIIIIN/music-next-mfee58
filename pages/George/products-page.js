import React from 'react'
import ProductsLatestLaunched from '@/components/George/products-mall/products-latest-launched'
import Footer from '@/components/public/footer';
import ProductsRecommendation from '@/components/George/products-mall/products-recommendation';
import ProductsActivities from '@/components/George/products-mall/products-activities';
import Forum from '@/components/public/nav/checklist/forum';
import NavDesktop from '@/components/public/nav/desktop';

export default function ProductsPage() {
  return (
    <>
    <NavDesktop />
    <ProductsActivities/>
    <ProductsRecommendation />
    <ProductsLatestLaunched />
    <Footer />
    </>
  )
}
