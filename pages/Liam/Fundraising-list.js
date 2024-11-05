import React from 'react'
import Kv from '@/components/Liam/Fundraising-list/kv'
import Nav from '@/components/public/nav'
import NewCard from '@/components/Liam/Fundraising-list/new/card'
import ListNewCard from '@/components/Liam/Fundraising-list/new'
import FundraisingTitle from '@/components/Liam/Fundraising-list/title'
import Footer from '@/components/public/footer'
import ListCategory from '@/components/Liam/Fundraising-list/category'

export default function FundraisingList() {
  const images = [
    { url: '/George/products-images-250px/products-(1).jpg', alt: 'Image 1' },
    { url: '/George/products-images-250px/products-(2).jpg', alt: 'Image 1' },
    { url: '/George/products-images-250px/products-(3).jpg', alt: 'Image 1' },
    { url: '/George/products-images-250px/products-(4).jpg', alt: 'Image 1' },
    { url: '/George/products-images-250px/products-(5).jpg', alt: 'Image 1' },
    { url: '/George/products-images-250px/products-(6).jpg', alt: 'Image 1' },

    // ... 更多圖片
  ];
  return (
    <div>
      <Nav />
      <Kv />
      <ListCategory />
      <FundraisingTitle text='!!(最新募資)'/>
    <ListNewCard  images={images}/>
    <FundraisingTitle text='<<(推薦募資)'/>
    <ListNewCard  images={images}/>
    <Footer />
    </div>
  )
}
