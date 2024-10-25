import React from 'react'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import Commodity1 from '@/components/card/ commodity'
import Category from '@/components/card/category'
export default function home() {
  return (
    <div>
       <Nav />
       <Commodity1 />

       <Category />
       <Footer />
   
    </div>

  )
}
