import React, { useState, useEffect } from "react";
import style from "./products-checkout.module.css";
import BlackWBtns from "../george-components/black_wbtns";
import { Quantity } from "../george-components/quantity/quantity";

export default function ProductsCheckout(props) {
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
            <input type="checkbox" name="albumcheck" />
            <div className={style.albumbox}>
              <img
                src="/George/products-images-250px/products-(2).jpg"
                alt=""
                className={style.albumpics}
              />
            </div>
            <div className={style.checkoutdescriptions}>
              <div>
                <h4 className={style.descriptionstitle}>七里香</h4>
                <div className={style.descriptionsalbumname}>不是周杰倫</div>
                <div className={style.descriptionscontent}>
                  在孤獨的呢喃中尋找心靈的平靜，這張專輯融合了民謠與電子元素。
                </div>
              </div>
            </div>
          </div>

          <div className={style.checkoutdirectorybox}>
            {/* <div className={style.checkoutprice}>$549</div> */}
            <ul className={style.checkoutdirectory}>
              <li>單價</li>
              <li>數量</li>
              <li>總價</li>
            </ul>
            <ul className={style.checkoutdirectory}>
              <li>$549</li>
              <li>1</li>
              <li>$549</li>
            </ul>
          </div>
        </div>

        {/* seperation line */}
        <div className={style.seperationline}></div>

        {/* payment and address confirming */}
        <div className={style.bottomcontainbox}>
          <div className={style.paymentandaddress}>
            <div className={style.paymentleftside}>
              <div className={style.payaddresstitle}>選擇地址及付款方式</div>
              <div className={style.PandAdirectory}>
                <ul className={style.padirectory}>
                  <li>收件姓名</li>
                  <li>聯絡電話</li>
                  <li>送貨方式</li>
                  <li>付款方式</li>
                  <li>優惠券</li>
                </ul>
                <ul className={style.padirectory}>
                  <li>
                    <input type="text" />
                  </li>
                  <li>
                    <input type="text" />
                  </li>
                  <li>
                    <select name="address" id="">
                      <option value="" disabled selected>
                        請選擇
                      </option>
                      <option value="delivery">宅配</option>
                      <option value="convenienstore">7-11 取貨</option>
                    </select>
                  </li>
                  <li>
                    <select name="payment" id="">
                      <option value="" disabled selected>
                        請選擇
                      </option>
                      <option value="cashondelivery">取貨付款</option>
                      <option value="debitcard">信用卡</option>
                    </select>
                  </li>
                  <li>
                    <input type="text" />
                  </li>
                </ul>
              </div>
            </div>
            <div className={style.finalcheck}>
              <div className={style.finalchecktitle}>結帳資訊</div>
              <div className={style.finalcheckbox}>
                <div className={style.finalcheckdirectorybox}>
                  <ul className={style.finalcheckdirectory}>
                    <li>小計</li>
                    <li>運費</li>
                  </ul>
                  <ul className={style.finalcheckdirectory}>
                    <li>$549</li>
                    <li>$80</li>
                  </ul>
                </div>

                <div className={style.paymentseperationline}></div>

                <div className={style.finaltotalbox}>
                  <div className={style.finaltotal}>
                    <div>合計</div>
                    <div>$629</div>
                  </div>
                  <BlackWBtns
                    type="2"
                    onClick={handleClick}
                    className={`${style.blackBtn}`}
                  >
                    前往結帳
                  </BlackWBtns>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
