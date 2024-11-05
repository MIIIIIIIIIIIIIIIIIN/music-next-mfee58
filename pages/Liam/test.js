import React from 'react'
import ImageGallery from '@/components/public/card/ commodity/test'
export default function test() {
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
      <ImageGallery images={images} />
      <style jsx>
        {`
          img{
            width:200px
          }
        `}
      </style>
    </div>
  )
}
