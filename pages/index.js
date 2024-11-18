import React, { useState, useEffect, useRef } from "react";

import Title from "@/components/home/title";
import Carousel from "@/components/public/carousel";
// import Daily from "@/components/home/daily";
import WaveVideo from "@/components/home/video";
import NavHome from "@/components/public/nav/home";

import ListNewCard from "@/components/Liam/Fundraising-list/new";
import Footer from "@/components/public/footer";
import MusicPlayer from "@/components/Liam/test";
import AudioPlayer from "@/components/Liam/music";

const Section = ({ children }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        // 更早觸發動畫
        threshold: 0.3,  // 只需要10%可見就觸發
        rootMargin: '0px 0px -10% 0px'  // 提前觸發，但不要等到完全消失才隱藏
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`section ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const images = ["/01.jpg", "/02.jpg", "/03.jpg"];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="main-container">
      <NavHome />
      
      <div className="parallax-container">
        <div 
          className="parallax-bg"
          style={{
            transform: `translateY(${scrollPosition * 0.5}px)`
          }}
        >
          <WaveVideo />
        </div>
      </div>

      <div className="content-container">
        <Section>
          <Title num={1} text="每日推薦" />
          <Carousel images={images} interval={2000} />
        </Section>

        <Section>
          <Title num={2} text="每日一曲" />
          <MusicPlayer />
        </Section>

        <Section>
          <Title num={3} text="最新募資" className="ma" />
          <ListNewCard />
        </Section>
      </div>

      <Footer />

      <style jsx global>{`
        .main-container {
          position: relative;
          overflow-x: hidden;
        }

        .parallax-container {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
        }

        .content-container {
          position: relative;
          background: white;
          z-index: 1;
        }

        .section {
          padding: 40px 0;
          opacity: 0;
          transform: translateY(50px); /* 減少位移距離 */
          transition: all 0.4s ease-out; /* 加快動畫速度 */
          will-change: opacity, transform;
        }

        .section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .section {
            padding: 20px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
