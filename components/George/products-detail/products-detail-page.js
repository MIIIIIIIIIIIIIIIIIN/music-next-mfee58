import React, { useEffect } from "react";
import style from "./products-detail.module.css";
import WhiteWBtns from "../george-components/white_wbtns";
import BlackWBtns from "../george-components/black_wbtns";
import { Quantity } from "../george-components/quantity/quantity";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import Link from "next/link";

export default function ProductsDetailPage({ albumDetail, albumImages, pid }) {
  const handleClick = () => {
    "";
  };

  useEffect(()=>{
    console.log("test: ", albumImages);
    
  }, [albumImages])

  return (
    <>
      <div className={style.containBox}>
        <div>
          <img
            src={`/${albumImages?.images?.[0]?.p_productsimg_filename}`}
            alt="kmn"
            className={style.albumpic}
          />
          {/* <div className={style.albumName}>{albumDetail?.p_albums_title}</div>
          <div className={style.albumDescription}>
          {albumDetail?.p_albums_description}
          </div> */}
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
                <li>{albumDetail?.p_albums_release_date.split("T")[0]}</li>
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
          <div className={style.totalAmount}>Total Purchase Amount ${parseInt(albumDetail?.p_albums_price)}</div>
          <div className={style.btns}>
            <Link href={"/George/products-cart-page"}>
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
              onClick={handleClick}
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
