import React, { useState, useEffect } from 'react';
import styles from './main-carousel.module.css';

const DetailMainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const images = [
    "/01.jpg",
    "/02.jpg",
    "/03.jpg"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.slide} ${
              index === currentSlide
                ? styles.active
                : index < currentSlide
                ? styles.prev
                : styles.next
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className={styles.image}
            />
          </div>
        ))}
      </div>

      <div className={styles.controlsContainer}>
        {/* Dots Indicator */}
        <div className={styles.dotsContainer}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`${styles.dot} ${
                index === currentSlide ? styles.activeDot : ''
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className={styles.navButtons}>
          <button onClick={prevSlide} className={styles.navButton}>
            ←
          </button>
          <button onClick={nextSlide} className={styles.navButton}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailMainCarousel;