import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Items1 from "./items1";
import styles from "./products-latest-launched.module.css";
import { MdArrowForwardIos } from "react-icons/md";

export default function ProductsLatestLaunched() {
  const products = [
    {
      description:
        "專輯《晨曦微光》以清晨的第一縷陽光為靈感，表達新一天的希望與開始。融合輕快的流行元素，帶給聽眾清新而積極的音樂體驗。",
      headline: "晨曦微光",
      image: "/George/products-images-250px/products-(1).jpg",
      singer: "陳曉彤 (Chen Xiao Tong)",
    },
    {
      description:
        "專輯《花開時節》以春天的花朵綻放為象徵，表達生命的美麗與希望。融合民謠與流行音樂，帶來溫暖而感性的音樂體驗。",
      headline: "花開時節",
      image: "/George/products-images-250px/products-(2).jpg",
      singer: "張偉 (Zhang Wei)",
    },
    {
      description:
        "探索內心世界與現實之間的界線，透過音樂帶領聽眾進入夢幻般的旅程。融合電子與流行元素，呈現多元的音樂風格。",
      headline: "夢境旅人",
      image: "/George/products-images-250px/products-(3).jpg",
      singer: "林宥辰 (Lin You Chen)",
    },
    {
      description:
        "專輯《彩虹彼端》以彩虹為主題，象徵希望與夢想的終點。融合活力四射的舞曲與流行旋律，帶給聽眾色彩繽紛的音樂體驗。",
      headline: "彩虹彼端",
      image: "/George/products-images-250px/products-(4).jpg",
      singer: "蔡依琳 (Cai Yilin)",
    },
    {
      description:
        "專輯《夜色迷霧》以夜晚的神秘氛圍為主題，融合R&B與流行元素，營造出寧靜而迷人的音樂氛圍。",
      headline: "夜色迷霧",
      image: "/George/products-images-250px/products-(5).jpg",
      singer: "鄧紫菱 (Deng Ziling)",
    },
    {
      description:
        "專輯《無限宇宙》探索宇宙的無限可能，融合電子音樂與流行旋律，展現廣闊無垠的音樂世界。",
      headline: "無限宇宙",
      image: "/George/products-images-250px/products-(6).jpg",
      singer: "王俊傑 (Wang Jun Jie)",
    },
    {
      description:
        "透過柔和的旋律與深情的歌詞，營造一個治癒心靈的音樂花園。專輯中的每首歌曲猶如花園中的一朵花，帶來不同的情感與感受。",
      headline: "心靈花園",
      image: "/George/products-images-250px/products-(7).jpg",
      singer: "陳靜怡 (Chen Jing Yi)",
    },
    {
      description:
        "專輯《未來視界》探索未來科技與人類情感的結合，融合電子與流行音樂，展現未來世界的多樣面貌。",
      headline: "未來視界",
      image: "/George/products-images-250px/products-(8).jpg",
      singer: "張志強 (Zhang Zhi Qiang)",
    },
    {
      description:
        "追求音樂的和諧與高度，融合多種樂器與聲音，創造豐富的音樂層次。專輯中的每首歌曲猶如音樂的高峰，帶來震撼與感動。",
      headline: "Harmony Heights",
      image: "/George/products-images-250px/products-(9).jpg",
      singer: "Emma Lee",
    },
    {
      description:
        "深入探討靈魂的聲音，融合藍調與爵士，表達內心深處的情感與故事。專輯中的音樂充滿靈性與深度，帶給聽眾心靈的共鳴。",
      headline: "靈魂之聲",
      image: "/George/products-images-250px/products-(10).jpg",
      singer: "李俊豪 (Li Jun Hao)",
    },
    {
      description:
        "以花火般的音樂展現心靈的絢麗與多彩，融合流行與電子元素，表達內心的激情與夢想。專輯中的每首歌曲如同夜空中的一朵花火，閃耀著不同的光芒。",
      headline: "心靈花火",
      image: "/George/products-images-250px/products-(11).jpg",
      singer: "李婷婷 (Li Ting Ting)",
    },
    {
      description:
        "以靜謐的氛圍創作音樂，融合環境音樂與輕音樂，營造平靜與放鬆的聆聽體驗。專輯中的每首歌曲如同靜謐的夜晚，帶來心靈的安寧。",
      headline: "靜謐之聲",
      image: "/George/products-images-250px/products-(12).jpg",
      singer: "鄭雅婷 (Zheng Ya Ting)",
    },
    {
      description:
        "通過光與影的變化，呈現人生的起伏與情感的交織，融合電子與民謠元素，創造出豐富的音樂層次。",
      headline: "光影交錯",
      image: "/George/products-images-250px/products-(13).jpg",
      singer: "鄭美玲 (Zheng Mei Ling)",
    },
    {
      description:
        "捕捉午夜時分的寧靜與神秘，融合電子與環境音樂，營造沉浸式的聆聽體驗，帶給聽眾深邃的情感共鳴。",
      headline: "Midnight Echoes",
      image: "/George/products-images-250px/products-(14).jpg",
      singer: "Daniel Kim",
    },
    {
      description:
        "結合電子音樂與流行元素，打造充滿未來感的音樂體驗。專輯中的每首歌曲如同一場電光火石的夢境，帶來前衛與創新的音樂風格。",
      headline: "Electric Dreams",
      image: "/George/products-images-250px/products-(15).jpg",
      singer: "Sophia Wang",
    },
    {
      description:
        "以心靈的成長與綻放為主題，融合流行與抒情元素，表達內心的變化與蛻變。專輯中的每首歌曲如同心靈的花朵，綻放出不同的色彩與情感。",
      headline: "心靈綻放",
      image: "/George/products-images-250px/products-(16).jpg",
      singer: "李美麗 (Li Mei Li)",
    },
    {
      description:
        "以星光為指引，帶領聽眾在音樂的海洋中迷航，融合流行與電子元素，創造夢幻般的音樂氛圍，展現無限的想像力與創意。",
      headline: "星光迷航",
      image: "/George/products-images-250px/products-(17).jpg",
      singer: "張雅雯 (Zhang Ya Wen)",
    },
    {
      description:
        "專輯《Future Beats》探索未來音樂的可能性，融合科技與創新，創作出具有前瞻性的音樂作品，展現未來音樂的無限潛力。",
      headline: "Future Beats",
      image: "/George/products-images-250px/products-(18).jpg",
      singer: "王宏 (Hom Wang)",
    },
    {
      description:
        "專輯《花開時節》以春天的花朵綻放為象徵，表達生命的美麗與希望。融合民謠與流行音樂，帶來溫暖而感性的音樂體驗。",
      headline: "花開時節",
      image: "/George/products-images-250px/products-(19).jpg",
      singer: "李佳穎 (Li Jia Ying)",
    },
    {
      description:
        "結合東方傳統元素與現代流行音樂，創造獨特的音樂風格，表達對愛情與生活的詮釋。",
      headline: "七里香",
      image: "/George/products-images-250px/products-(20).jpg",
      singer: "周杰倫 (Jay Chou)",
    },
  ];

  return (
    <>
      <div className={styles["carousel-container"]}>
        <h3
          style={{
            fontWeight: "bold",
            borderBottom: "1.5px solid rgba(20, 255, 0, 1)",
            paddingBottom: "0.5em",
          }}
        >
          新發行
          <MdArrowForwardIos style={{ fontSize: "20px", marginLeft: "5px" }} />
        </h3>
        <div className="latestLaunch"></div>
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
    </>
  );
}
