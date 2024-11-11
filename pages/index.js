import React, { useState, useEffect } from "react";
import NavDesktop from "@/components/public/nav/desktop";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Commodity1 from "@/components/public/card/ commodity";
import NavMobile from "@/components/public/nav/mobile";
import Title from "@/components/home/title";
import Carousel from "@/components/public/carousel";
import Daily from "@/components/home/daily";
import WaveVideo from "@/components/home/video";
import NavHome from "@/components/public/nav/home";
import Nav from "@/components/public/nav/index";
import NavHomePage from "@/components/public/nav/home";
import ListNewCard from "@/components/Liam/Fundraising-list/new";
import Footer from "@/components/public/footer";
import MusicPlayer from "@/components/Liam/test";
import AudioPlayer from "@/components/Liam/music";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const images = ["/Liam/01/01.jpg", "/Liam/01/02.jpg", "/Liam/01/03.jpg"];

  return (
    <>
      <div>
        <NavHome />
        <WaveVideo />

        <Title num={1} text="每日推薦" />
        <Carousel images={images} interval={2000} />

        <Title num={2} text="每日一曲" />
        <MusicPlayer />
        {/* <Daily /> */}
        <Title num={3} text="最新募資" className="ma" />

        <ListNewCard />

        <Footer />
      </div>
      <style jsx>{``}</style>
    </>
  );
}
