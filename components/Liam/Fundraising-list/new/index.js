import React, { useState, useRef } from "react";
import NewCard from "./card";
import styles from "./list.module.css";

export default function ListNewCard({ images = []}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const list = useRef();

  const data = [
    { title: "Fragments of Youth", artist: "Neon Dreams", description: "Song list...", progress: 70, bgColor: "#fff" },
    { title: "Electric Horizons", artist: "Wildfire Union", description: "Song list...", progress: 90, bgColor: "#fff" },
    { title: "Embers and Echoes", artist: "Rising Rebels", description: "Song list...", progress: 60, bgColor: "#fff" },
    { title: "Veins of Adventure", artist: "Crimson Pulse", description: "Song list...", progress: 80, bgColor: "#fff" },
    { title: "Winds of Change", artist: "Sky Wanderers", description: "Song list...", progress: 50, bgColor: "#fff" },
    { title: "Echoes of Time", artist: "Silent Horizon", description: "Song list...", progress: 85, bgColor: "#fff" },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  React.useEffect(() => {
    // 每次 currentIndex 改變時更新 translateX 值
    list.current.style.transform = `translateX(-${currentIndex * 220}px)`;
    list.current.style.transition = "transform 0.5s ease"; // 添加平滑過渡效果
  }, [currentIndex]);

  return (
    <>
      <div className="wrap">
        <div className={styles.container}>
          <button className={styles.button} onClick={handlePrevious}>&lt;</button>
          <div className={styles.cut}>
            <div className={styles.carousel} ref={list}>
              {images.map((item, index) => (
                <div key={index} className={styles.cardContainer}>
                  <NewCard {...item} />
                </div>
              ))}
            </div>
          </div>
          <button className={styles.button} onClick={handleNext}>&gt;</button>
        </div>
      </div>
    </>
  );
}
