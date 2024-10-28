import React from "react";
import style from "../styles/allfonts-styles.module.css";
import styles from "./products-carousel.module.css";

export default function Items1({ description, headline, image }) {
  return (
    <>
      <div className="carousel-item">
        <img src={image} alt={headline} className="carousel-image" />
        <div className="carousel-content">
          <h3>{headline}</h3>
          <div className="multiline-ellipsis">{description}</div>
        </div>
      </div>
      <style jsx>
        {`
          .carousel-item {
            width: 200px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            height: 30em;
            margin: auto;
            transition: transform 0.3s ease;
          }
          .carousel-item:hover {
            transform: scale(1.05);
          }
          .carousel-image {
            width: 100%;
            height: 250px;
          }
          .carousel-content {
            padding: 5px;
          }
          .multiline-ellipsis {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 4;
            text-overflow: ellipsis;
          }
        `}
      </style>
    </>
  );
}
