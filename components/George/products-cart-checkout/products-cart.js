import React, { useState, useEffect } from "react";
import style from "./products-cart.module.css";
import BlackWBtnsMobile from "../george-components/black_wbtns_mobile";
import { Quantity } from "../george-components/quantity/quantity";
import Link from "next/link";

export default function ProductsCart({ mdBox, listData }) {
  const handleClick = () => {
    "";
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
          {/* 購物車結帳流程 */}
          <div className={style.checkingout}>
            <ul className={style.checkingoutlist}>
              <li>
                <span className={`${style.procedure} ${style.proceduring}`}>1</span>購物車
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
          {mdBox &&
            mdBox.map((v, i) => {
              return (
                <div className={style.checkoutcontainer} key={i}>
                  <div className={style.checkoutcontainer1}>
                    <div className={style.checkboxandpic}>
                      <input type="checkbox" name="albumcheck" />
                      <div className={style.albumbox}>
                        <img
                          src={`/${v.p_cart_img_filename}`}
                          alt={v.p_cart_img_filename}
                          className={style.albumpics}
                        />
                      </div>
                    </div>

                    {Array.isArray(listData.rows) &&
                      listData.rows
                        .filter((id) => v.p_albums_id === id.p_albums_id)
                        .map((album, index) => {
                          return (
                            <div className={style.checkoutdescriptions} key={index}>
                              <div className={style.mobilecontroller}>
                                <h4 className={style.descriptionstitle}>
                                  {album.p_albums_title}
                                </h4>
                                <div className={style.descriptionsalbumname}>
                                  {album.p_albums_artist}
                                </div>
                              </div>
                              <div className={style.checkoutqpbox}>
                                <div className={style.checkoutquantity}>
                                  <Quantity />
                                </div>
                                <div className={style.checkoutprice}>
                                  ${album.p_albums_price}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              );
            })}

          {/* separation line */}
          <div className={style.seperationline}></div>

          {/* total + checkout button */}
          <div className={style.totalandcheckoutbutton}>
            <div className={style.totalamount}>總金額(1件商品)：$549</div>
            <Link href={"/George/checkout/products-checkout-page"}>
              <BlackWBtnsMobile
                type="2"
                onClick={handleClick}
                className={`${style.blackBtn} ${style.adjustblackbtn}`}
              >
                去結帳
              </BlackWBtnsMobile>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}