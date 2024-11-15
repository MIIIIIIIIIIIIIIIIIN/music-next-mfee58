import React, { useState, useEffect } from "react";
import style from "./products-completed.module.css";
import BlackWBtns from "../george-components/black_wbtns";
import WhiteWBtns from "../george-components/white_wbtns";
import Link from "next/link";

export default function ProductsCompleted(props) {
  const handleClick = () => {
    ""
  };

  return (
    <>
      <div className={style.banner}>
        <div className={style.vcover}></div>
        <video autoPlay muted loop>
          <source src="/George/1920x720-videos/v-(3).mp4" type="video/mp4" />
          你的瀏覽器不支援影片播放。
        </video>
        <div className={style.container}>
          <div className={style.ordercompletedbox}>
            <div className={style.orderbox}>
              <div className={style.completedicon}></div>
              <div className={style.ordercompleted}>訂單完成</div>
              <div className={style.ordernumbers}>訂單號碼: Ph12345678</div>
            </div>
            <div className={style.btnscontroller}>
              <Link href={"/George/product"}>
              <BlackWBtns type="2" onClick={handleClick}>
                繼續購物
              </BlackWBtns>
              </Link>
              {" "}
              <WhiteWBtns type="1" onClick={handleClick}>
                查看訂單
              </WhiteWBtns>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
