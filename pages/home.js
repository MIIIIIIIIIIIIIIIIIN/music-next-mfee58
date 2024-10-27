import React from 'react'
import NavDesktop from '@/components/nav/desktop'
import Footer from '@/components/footer'
import Commodity1 from '@/components/card/ commodity'
import Category from '@/components/card/category'
import NavMobile from '@/components/nav/mobile'


export default function home() {
  return (
    <div>
       <NavDesktop />
       <NavMobile />
       {/* <Commodity1 /> */}

       <Category />
       <Footer />
   
    </div>

  )
}
