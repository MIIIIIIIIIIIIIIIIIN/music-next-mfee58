import React, { useState } from "react";
import style from "./products-othersYouLike.module.css";

export default function Items2({ image, singer, headline }) {
  const [hover, setHover] = useState(false);

// 這邊要抓到都是同一個分類的專輯 SQL 語法
  return (
    <div onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
      <img src={`/${image}`} alt="" className={style.carouselImage} />
      {hover && (
        <div className={style.overlay}>
          <div className={style.headline}>{headline}</div>
          <div className={style.singer}>{singer}</div>
        </div>
      )}
    </div>
  );
}
