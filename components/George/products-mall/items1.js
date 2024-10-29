import React from "react";
import style from "./products-latest-launched.module.css";

export default function Items1({ description, headline, image }) {
  return (
    <>
      <div className={style.carouselItem}>
        <img src={image} alt={headline} className={style.carouselImage} />
        <div className={style.carouselContent}>
          <h3>{headline}</h3>
          <div className={style.multilineEllipsis}>{description}</div>
        </div>
      </div>
    </>
  );
}
