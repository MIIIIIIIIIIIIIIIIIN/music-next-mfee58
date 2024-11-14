import React, { useState, useEffect } from "react";
import FooterDeskTop from "@/components/George/george-components/footer/desktop";
import FooterMobile from "@/components/George/george-components/footer/mobile";
import Nav from "@/components/George/george-components/nav";
import ProductsCart from "@/components/George/products-cart-checkout/products-cart";
import { QuantityProvider } from "@/components/George/context/quantity-provider";
import { CartProvider } from "@/components/George/context/cartdetail-provider";
import useFetchDB from "@/components/George/hooks/usefetchDB";

export default function ProductsCartPage(props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const { memData, listData, mdBox } = useFetchDB();


  

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
  
      console.log("urid: ", listData);
      
  }, [listData]);  // 這樣只有當 mdBox 更新後才會 log 出來

  return (
    <>
      <Nav />
      <QuantityProvider>
        <CartProvider>
          <ProductsCart mdBox={mdBox} listData={listData} />
        </CartProvider>
      </QuantityProvider>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
