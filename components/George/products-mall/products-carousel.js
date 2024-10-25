import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Items from "./items";

export default function ProductsCarousel() {
  const products = [
    {
      description:
        "專輯《時光碎片》通過音樂表達時間的流逝與回憶的碎片，融合現代流行與抒情元素，帶領聽眾穿梭在過去與現在的交錯中，感受每一刻的美好與回憶。",
      headline: "時光碎片",
      image: "/prodcuts-images-250px/products-9.jpg",
    },
    {
      description:
        "專輯《時光碎片》通過音樂表達時間的流逝與回憶的碎片，融合現代流行與抒情元素，帶領聽眾穿梭在過去與現在的交錯中，感受每一刻的美好與回憶。",
      headline: "時光碎片",
      image: "/prodcuts-images-250px/products-8.jpg",
    },
    {
      description:
        "專輯《時光碎片》通過音樂表達時間的流逝與回憶的碎片，融合現代流行與抒情元素，帶領聽眾穿梭在過去與現在的交錯中，感受每一刻的美好與回憶。",
      headline: "時光碎片",
      image: "/prodcuts-images-250px/products-10.jpg",
    },
  ];

  return (
    <>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 375,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {products.map((v, i) => {
          return (
            <Items
              key={i}
              description={v.description}
              headline={v.headline}
              image={v.image}
            />
          );
        })}
      </Carousel>
    </>
  );
}
