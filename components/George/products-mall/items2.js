import React from "react";
import style from "./products-recommendation.module.css";
import Link from "next/link";

export default function Items2({ description, headline, image, singer }) {
  return (
    <>
      <div className={style.itemContainer}>
        <Link href={"/George/products-detail"} >
          <div className={style.imageWrapper}>
            <img src={image} alt={headline} className={style.recCarousel} />

            <div className={style.overlayItems}>
              <div>
                <img src={image} alt={headline} className={style.overlayImg} />
              </div>
              <div className={style.overlayContentBox}>
                <div className={style.overlayHeadline}>{headline}</div>
                <div className={style.overlaySinger}>{singer}</div>
              </div>
            </div>
          </div>
          <h3 className={style.itemHeadline}>{headline}</h3>
          <div className={style.itemDescription}>{description}</div>
        </Link>
      </div>
    </>
  );
}
