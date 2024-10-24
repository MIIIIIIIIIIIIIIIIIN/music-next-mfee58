import React from "react";
import style from "./quantity.module.css";

export const Quantity = () => {
  return (
    <>
    <div className="container">
      <div className={style["quantity"]}>

      <div className={style["div-wrapper"]}>
          <div className={style["text-wrapper-2"]}>-</div>
        </div>
        
        <div className={style["QUTANTITY"]}>
          <div className={style["text-wrapper"]}>1</div>
        </div>

        <div className={style["div-wrapper"]}>
          <div className={style["div"]}>+</div>
        </div>


      </div>
      </div>
      <style jsx>
        {`
          .container {
            width: 1200px;
            margin: auto;
            text-align: center;
          }
        `}
      </style>
    </>
  );
};
