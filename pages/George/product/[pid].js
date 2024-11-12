import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";
import { AddToCartBar } from "@/components/public/addtocart-bar/add-to-cart";
import ProductsDetailPage from "@/components/George/products-detail/products-detail-page";
import ProductsListen from "@/components/George/products-detail/products-listen";
import ProductsDescription from "@/components/George/products-detail/products-description";
import ProductsMore from "@/components/George/products-detail/products-more";
import OthersYouLike from "@/components/George/products-detail/products-othersYouLike";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductsDetail() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const [albumDetail, setAlbumDetail] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const router = useRouter();
  const { pid } = router.query;
  

  useEffect(() => {
    if (!router.isReady || !pid) return;
    const fetchAlbumIdData = async () => {
      try {
        const responseAlbumsData = await axios.get(
          `http://localhost:3005/api/albums/${pid}`
        );
        // console.log("Album Data:", responseAlbumsData.data);
        setAlbumDetail(responseAlbumsData.data);
        const responseAlbumsImage = await axios.get(
          `http://localhost:3005/api/albums/images/${pid}`
        );
        // console.log("Album Images:", responseAlbumsImage.data);
        setAlbumImages(responseAlbumsImage.data);
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchAlbumIdData();
  }, [router.isReady, pid]);

  useEffect(() => {
    // 定義處理螢幕寬度變化的函數
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // 初次渲染時呼叫一次以設置初始狀態
    handleResize();

    // 添加 resize 事件監聽器
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    // 移除事件監聽器以避免內存洩漏
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Album Detail after fetch:", albumDetail);
    console.log("Album Images after fetch:", albumImages);
  }, [albumDetail, albumImages]);

  return (
    <>
      <Nav />
      <ProductsDetailPage albumDetail={albumDetail} albumImages={albumImages} pid={pid}/>
      <ProductsListen />
      <ProductsDescription albumDetail={albumDetail} albumImages={albumImages} pid={pid}/>
      <ProductsMore />
      <OthersYouLike albumDetail={albumDetail} albumImages={albumImages} pid={pid}/>
      <AddToCartBar albumDetail={albumDetail} pid={pid}/>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
