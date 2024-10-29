import React from "react";
import style from "./products-detail.module.css";
import WhiteWBtns from "./white_wbtns";
import BlackWBtns from "./black_wbtns";
import { Quantity } from "./quantity/quantity";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLine } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export default function ProductsDetailPage() {
  const handleClick = () => {
    alert("Wide Buttons clicked!");
  };
  return (
    <>
      <div className={style.containBox}>
        <div>
        <img
          src="/George/products-images-350px/products-(94).jpg"
          alt="alubumpic"
          className={style.albumpic}
        />
        <div className={style.albumName}>Whispers of Solitude</div>
        <div className={style.albumDescription}>
          在孤獨的呢喃中尋找心靈的平靜，這張專輯融合了民謠與電子元素。
        </div>
        </div>
        <div className="containContent">
          {/* Title */}
          <div className={style.albumName}>Whispers of Solitude</div>
          {/* 商品詳細資料 */}
          <div className={style.cotent}>
            <span className={style.contentTitles}>
              <ul>
                <li>價格</li>
                <li>會員折扣</li>
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
                <li>$200</li>
                <li>8折</li>
                <li>2024/10/29</li>
                <li>International Shipping</li>
                <li>宅配(新竹物流、Fedex)、超商(全家、7-11)</li>
                <li>不是周杰倫</li>
                <li>{<Quantity />}</li>
                <li>
                  <FaFacebookSquare size={30} />
                  <FaLine size={30} />
                  <FaSquareInstagram size={30} />
                </li>
              </ul>
            </span>
          </div>

          {/* 放線線 */}
          <div className={style.seperationLine}></div>
          <div className={style.totalAmount}>Total Purchase Amount $200</div>
          <div className={style.btns}>
            <BlackWBtns
              type="2"
              onClick={handleClick}
              className={style.blackBtn}
            >
              直接購買
            </BlackWBtns>
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
