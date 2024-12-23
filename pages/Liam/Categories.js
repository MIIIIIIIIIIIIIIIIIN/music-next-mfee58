import React from 'react'
import Commodity1 from '@/components/public/card/ commodity'
import ListNewCard from '@/components/Liam/Fundraising-list/new'
import Nav from '@/components/public/nav'
import Footer from '@/components/public/footer'

export default function Categories() {
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
      <Nav/>
    <Commodity1 images={images}/>
    <Footer />
    </div>
  )
}
