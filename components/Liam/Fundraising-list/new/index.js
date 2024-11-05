import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './list.module.css';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef(null);
  
  const images = [
    {
      src: "/George/products-images-940px/products-(61).jpg",
      title: "Fragments of Youth",
      tag1: "Dreams",
      tag2: "Broken Wings",
      tag3: "Electronic"
    },
    {
      src: "/George/products-images-940px/products-(62).jpg",
      title: "Fragments of Youth",
      tag1: "Dreams", 
      tag2: "Broken Wings",
      tag3: "Electronic"
    },
    {
      src: "/George/products-images-940px/products-(63).jpg",
      title: "Fragments of Youth",
      tag1: "Dreams",
      tag2: "Broken Wings", 
      tag3: "Electronic"
    },
    {
      src: "/George/products-images-940px/products-(64).jpg",
      title: "Fragments of Youth",
      tag1: "Dreams",
      tag2: "Broken Wings",
      tag3: "Electronic"
    },
    {
      src: "/George/products-images-940px/products-(65).jpg",
      title: "Fragments of Youth",
      tag1: "Dreams",
      tag2: "Broken Wings",
      tag3: "Electronic"
    }
  ];

  const CARD_WIDTH = 220;
  const CARD_GAP = 35;

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const visibleCards = Math.floor(containerWidth / (CARD_WIDTH + CARD_GAP));
      const maxScrollIndex = images.length - visibleCards;
      setMaxScroll(Math.max(0, maxScrollIndex));
    }
  }, [images.length]);

  const nextSlide = () => {
    if (currentIndex < maxScroll) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} ref={containerRef}>
        <div 
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.card}
        
            >
              <div className={styles.cardInner }>
                <a href='/Liam/detail' className={`card${index}`}
                 
                >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.title}>{image.title}</h3>
                  <div className={styles.tags}>
                    <span className={styles.tag}>
                      {image.tag1}
                    </span>
                    <span className={styles.tag}>
                      {image.tag2}
                    </span>
                    <span className={styles.tag}>
                      {image.tag3}
                    </span>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressIndicator}></div>
                </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className={`${styles.button} ${styles.buttonLeft} ${
          currentIndex === 0 ? styles.buttonDisabled : ''
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button 
        onClick={nextSlide}
        disabled={currentIndex >= maxScroll}
        className={`${styles.button} ${styles.buttonRight} ${
          currentIndex >= maxScroll ? styles.buttonDisabled : ''
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImageCarousel;