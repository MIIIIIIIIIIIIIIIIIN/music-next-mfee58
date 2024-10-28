import React from "react";

export default function Items2({ description, headline, image, singer }) {
  return (
    <>
      <div className="item-container">
        <div className="image-wrapper">
          <img src={image} alt={headline} className="recCarousel" />
          <div className="overlay-items">
            <div>
              <img src={image} alt={headline} className="overlay-img" />
            </div>
            <div className="overlay-content-box">
              <div className="overlay-headline">{headline}</div>
              <div className="overlay-singer">{singer}</div>
            </div>
          </div>
        </div>
        <h3 className="item-headline">{headline}</h3>
        <div className="item-description">{description}</div>
      </div>
      <style jsx>
        {`
          .item-container {
            height: 27em;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin: 15px;
            transition: transform 0.3s ease;
          }

          .item-container:hover {
            transform: scale(1.05);
          }
          .recCarousel {
            height: 300px;
            width: 100%;
            object-fit: cover;
            margin-bottom: 10px;
            box-shadow: 0.3px 0.3px 10px lightgray;
          }
          .item-headline {
            font-size: 18px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .item-description {
            font-size: 14px;
          }
          .overlay-items {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(165, 165, 165, 0.4);
            color: white;
            padding: 10px;
            display: flex;
            align-items: center;
            width: 13em;
            padding: 0.5em;
          }
          .overlay-headline {
            font-size: 18px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .overlay-singer {
            font-size: 14px;
            width: 10em;
          }
          .image-wrapper {
            position: relative;
          }
          .overlay-img {
            height: 3em;
            width: 3em;
          }
          .overlay-content-box {
            margin-left: 1em;
          }
        `}
      </style>
    </>
  );
}
