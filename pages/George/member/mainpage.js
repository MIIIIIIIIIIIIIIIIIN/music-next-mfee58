import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/George/george-components/footer/desktop";
import FooterMobile from "@/components/George/george-components/footer/mobile";
import Nav from "@/components/George/george-components/nav";
import InfoNav from "@/components/George/member-components/info-nav";
import User from "@/components/George/member-components/user-information/user";

export default function Mainpage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Nav />
      <InfoNav/>
      <User/>
      <FooterDeskTop />
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
