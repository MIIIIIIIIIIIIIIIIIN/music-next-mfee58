import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Items1 from "./items1";
import styles from "./products-carousel.module.css";
import { MdArrowForwardIos } from "react-icons/md";

export default function ProductsLatestLaunched() {
  const products = [
    {
      description:
        "專輯《時光碎片》通過音樂表達時間的流逝與回憶的碎片，融合現代流行與抒情元素，帶領聽眾穿梭在過去與現在的交錯中，感受每一刻的美好與回憶。",
      headline: "時光碎片",
      image: "/prodcuts-images-250px/products-4.jpg",
      singer: "張偉 (Zhang Wei)",
    },
    {
      description:
        "專輯《晨曦微光》以清晨的第一縷陽光為靈感，表達新一天的希望與開始。融合輕快的流行元素，帶給聽眾清新而積極的音樂體驗。",
      headline: "晨曦微光",
      image: "/prodcuts-images-250px/products-2.jpg",
      singer: "陳曉彤 (Chen Xiao Tong)",
    },
    {
      description:
        "結合東方傳統元素與現代流行音樂，創造獨特的音樂風格，表達對愛情與生活的詮釋。",
      headline: "七里香",
      image: "/prodcuts-images-250px/products-3.jpg",
      singer: "周杰倫 (Jay Chou)",
    },
    {
      description:
        "專輯《夜色迷霧》以夜晚的神秘氛圍為主題，融合R&B與流行元素，營造出寧靜而迷人的音樂氛圍。",
      headline: "夜色迷霧",
      image: "/prodcuts-images-250px/products-11.jpg",
      singer: "鄧紫菱 (Deng Ziling)",
    },
    {
      description:
        "專輯《彩虹彼端》以彩虹為主題，象徵希望與夢想的終點。融合活力四射的舞曲與流行旋律，帶給聽眾色彩繽紛的音樂體驗。",
      headline: "彩虹彼端",
      image: "/prodcuts-images-250px/products-15.jpg",
      singer: "蔡依琳 (Cai Yilin)",
    },
    {
      description:
        "專輯《花開時節》以春天的花朵綻放為象徵，表達生命的美麗與希望。融合民謠與流行音樂，帶來溫暖而感性的音樂體驗。",
      headline: "花開時節",
      image: "/prodcuts-images-250px/products-13.jpg",
      singer: "李佳穎 (Li Jia Ying)",
    },
    {
      description:
        "探索內心世界與現實之間的界線，透過音樂帶領聽眾進入夢幻般的旅程。融合電子與流行元素，呈現多元的音樂風格。",
      headline: "夢境旅人",
      image: "/prodcuts-images-250px/products-14.jpg",
      singer: "林宥辰 (Lin You Chen)",
    },
  ];

  return (
    <>
      <div className={styles["carousel"]}>
        <div className="latestlaunch">
          <h2 style={{ fontWeight: "bold" }}>
            新發行
            <MdArrowForwardIos
              style={{ fontSize: "40px", marginLeft: "10px" }}
            />
          </h2>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
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
              items: 6.5,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
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
              <Items1
                key={i}
                description={v.description}
                headline={v.headline}
                image={v.image}
              />
            );
          })}
        </Carousel>
      </div>
      <style jsx>
        {`
          .latestlaunch {
            display: flex;
            align-items: center;
            line-height: 70px;
          }
        `}
      </style>
    </>
  );
}
