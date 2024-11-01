import React, { useState, useEffect } from "react";
import style from "./products-cart.module.css";
import BlackWBtnsMobile from "../george-components/black_wbtns_mobile";
import { Quantity } from "../george-components/quantity/quantity";

export default function ProductsCart(props) {
  const handleClick = () => {
    alert("Wide Buttons clicked!");
  };

  return (
    <>
      <div className={style.container}>
        {/* 購物車結帳流程 */}
        <div className={style.checkingout}>
          <ul className={style.checkingoutlist}>
            <li>
              <span className={style.procedure}>1</span>購物車
            </li>
            <li>
              <span className={style.procedure}>2</span>結帳
            </li>
            <li>
              <span className={style.procedure}>3</span>結帳完成
            </li>
          </ul>
        </div>

        {/* 購買細項 */}
        <div className={style.checkoutcontainer}>
          <div className={style.checkoutcontainer1}>
            <div className={style.checkboxandpic}>
            <input type="checkbox" name="albumcheck" />
            <div className={style.albumbox}>
              <img
                src="/George/products-images-250px/products-(2).jpg"
                alt=""
                className={style.albumpics}
              />
            </div>
            </div>

            <div className={style.checkoutdescriptions}>
              <div className={style.mobilecontroller}>
                <h4 className={style.descriptionstitle}>七里香</h4>
                <div className={style.descriptionsalbumname}>不是周杰倫</div>
                <div className={style.descriptionscontent}>
                  在孤獨的呢喃中尋找心靈的平靜，這張專輯融合了民謠與電子元素。
                </div>
              </div>
              <div className={style.checkoutqpbox}>
              <div className={style.checkoutquantity}>{<Quantity />}</div>
              <div className={style.checkoutprice}>$549</div>
              </div>
            </div>

          </div>
        </div>

        {/* seperation line */}
        <div className={style.seperationline}></div>

        {/* total + checkout button */}
        <div className={style.totalandcheckoutbutton}>
          <div className={style.totalamount}>總金額(1件商品)：$549</div>
          <BlackWBtnsMobile
            type="2"
            onClick={handleClick}
            className={`${style.blackBtn} ${style.adjustblackbtn}`}
          >
            去結帳
          </BlackWBtnsMobile>
        </div>
      </div>
    </>
  );
}
