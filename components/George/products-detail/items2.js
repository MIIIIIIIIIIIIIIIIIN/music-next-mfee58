import React, {useState} from "react";
import style from "./products-othersYouLike.module.css";

export default function Items2({ image }) {
  const [touch, setTouch] = useState(false);

  const handleTouch = () => {

  };

  return (
    <div>
      <img src={image} alt="" className={style.carouselImage} />
    </div>
  );
}
