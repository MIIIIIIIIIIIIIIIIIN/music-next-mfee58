import React from "react";
import style from "../styles/allfonts-styles.module.css";

export default function Items({ description, headline, image }) {
  return (
    <>
      <div className="carousel-item">
        <img src={image} alt={headline} className="carousel-image" />
        <div className="carousel-content">
          <h3>{headline}</h3>
          <div className={style["text-wrapper-7"]}>{description}</div>
        </div>
      </div>
      <style jsx>
        {`
          .carousel-item {
            width: 250px;
            box-shadow: 0.3px 0.3px 5px lightgray;
          }
          .carousel-image {
            width: 100%;
            height: 400px;
            
          }
          .carousel-content {
            padding: 10px;
          }
        `}
      </style>
    </>
  );
}
