import React, { useEffect, useState } from "react";
import style from "./products-detail.module.css";
import WhiteWBtns from "../george-components/white_wbtns";
import BlackWBtns from "../george-components/black_wbtns";
import { Quantity } from "../george-components/quantity/quantity";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";
import { QuantityProvider, useQuantity } from "../context/quantity-provider";
import { CartProvider, useCartDetail } from "../context/cartdetail-provider";
import axios from "axios";
import useFetchDB from "@/components/George/hooks/usefetchDB";

export default function ProductsDetailPage({ albumDetail, albumImages }) {
  const { urid } = useFetchDB();
  const { addToCart, setAddToCart } = useCartDetail();
  const { quantity } = useQuantity();
  const handleClick = () => {
    "";
  };

  const handleAddtoCart = () => {
    if (albumDetail) {
      // 準備要傳送的資料
      const cartData = {
        commodityid: null,
        albumId: albumDetail?.p_albums_id || null,
        userId: 1,
        pic: albumImages?.images?.[0]?.p_productsimg_filename,
        quantity: quantity,
        price: parseInt(albumDetail?.p_albums_price),
      };

      // 發送 POST 請求將資料儲存到購物車
      axios
        .post("http://localhost:3005/api/addToCart", cartData)
        .then((response) => {
          console.log("Item added to cart", response.data); // 回應成功時
        })
        .catch((error) => {
          console.error("Error adding item to cart", error); // 錯誤處理
        });
    }
  };

  // useEffect(() => {
  //   console.log("檢查欸吐卡ㄊ1: ", addToCart);
  // }, [addToCart]);
  // useEffect(() => {
  //   console.log("test: ", albumImages);
  // }, [albumImages]);

  return (
    <>
      <div className={style.containBox}>
        <div>
          <img
            src={`/${albumImages?.images?.[0]?.p_productsimg_filename}`}
            alt="kmn"
            className={style.albumpic}
          />
        </div>
        <div className="containContent">
          {/* Title */}
          <div className={style.albumName}>{albumDetail?.p_albums_title}</div>
          {/* 商品詳細資料 */}
          <div className={style.cotent}>
            <span className={style.contentTitles}>
              <ul>
                <li>價格</li>
                <li>上架日期</li>
                <li>運送類型</li>
                <li>運送方式</li>
                <li>演唱者</li>
                <li>數量</li>
                <li>分享</li>
              </ul>
            </span>
            <span className={style.contentDetails}>
              <ul>
                <li>${parseInt(albumDetail?.p_albums_price)}</li>
                <li>
                  {albumDetail?.p_albums_release_date
                    ? albumDetail.p_albums_release_date.split("T")[0]
                    : "未提供"}
                </li>
                <li>{albumDetail?.p_albums_delivery_methods}</li>
                <li>宅配(新竹物流、Fedex)、超商(全家、7-11)</li>
                <li>{albumDetail?.p_albums_artist}</li>
                <li>{<Quantity />}</li>
                <li>
                  <FaFacebookSquare size={30} className={style.icons} />
                  <FaLine size={30} className={style.icons} />
                  <FaSquareInstagram size={30} />
                </li>
              </ul>
            </span>
          </div>

          {/* 放線線 */}
          <div className={style.seperationLine}></div>
          <div className={style.totalAmount}>
            Total Purchase Amount ${parseInt(albumDetail?.p_albums_price)}
          </div>
          <div className={style.btns}>
            {/* <Link href={`/George/cart/${urid}`}> */}
            <Link href={`/George/cart/${urid}`}>

              <BlackWBtns
                type="2"
                onClick={handleClick}
                className={style.blackBtn}
              >
                直接購買
              </BlackWBtns>
            </Link>

            <WhiteWBtns
              type="1"
              onClick={handleAddtoCart}
              className={style.whiteBtn}
            >
              加入購物車
            </WhiteWBtns>
          </div>
        </div>
      </div>
    </>
  );
}
