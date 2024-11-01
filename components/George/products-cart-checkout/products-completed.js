import React, { useState, useEffect } from "react";
import style from "./products-completed.module.css";
import BlackWBtns from "../george-components/black_wbtns";
import WhiteWBtns from "../george-components/white_wbtns";

export default function ProductsCompleted(props) {
  const handleClick = () => {
    alert("Wide Buttons clicked!");
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.ordercompletedbox}>
          <div className={style.completedicon}></div>
          <div className={style.ordercompleted}>訂單完成</div>
          <div className={style.ordernumbers}>訂單號碼: Ph12345678</div>
          <div className={style.btnscontroller}>
            <BlackWBtns
              type="2"
              onClick={handleClick}
            >
              繼續購物
            </BlackWBtns>{" "}
            <WhiteWBtns
              type="1"
              onClick={handleClick}
            >
              查看訂單
            </WhiteWBtns>
          </div>
        </div>
      </div>
    </>
  );
}
