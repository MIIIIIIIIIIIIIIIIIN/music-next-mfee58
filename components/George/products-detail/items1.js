import React from "react";
import style from "./products-more.module.css";

export default function Items1({ image }) {
  return (
    <div>
      <img src={image} alt="" className={style.carouselImage} />
    </div>
  );
}
