import React, { useState, useEffect } from "react";
import NavDesktop from "@/components/public/nav/desktop";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Commodity1 from "@/components/public/card/ commodity";
import NavMobile from "@/components/public/nav/mobile";
import Title from "@/components/home/title";
import Carousel from "@/components/public/Carousel";
import Daily from "@/components/home/daily";
import WaveVideo from "@/components/home/video";
import NavHome from "@/components/public/nav/home";
import Nav from "@/components/public/nav/index";
import NavHomePage from "@/components/public/nav/home";
import ListNewCard from "@/components/Liam/Fundraising-list/new";
import Footer from "@/components/public/footer";


export default function home() {

  return (
    <>
    <div>

      <Nav />
      <WaveVideo />
      <Title num={1} text="每日推薦"/>

      {/* <Carousel images={images} interval={2000} /> */}

      {/* <Commodity1 /> */}
      <Daily />
      <Title num={2} text="最新募資"  className='ma'/>
      
      <ListNewCard />
      
      <Footer />

      
    </div>
    <style jsx>
      {`
       
      `}
    </style>
    </>
  );
}
