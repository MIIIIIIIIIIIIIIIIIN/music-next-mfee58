import React, { useState, useEffect } from "react";
import { AB_LIST, AB_DEL_DELETE } from "@/config/api-path";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductsGenres from "@/components/George/card";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";

export default function ProductsFilter() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);

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

  // const images = [
  //   { url: "/George/products-images-250px/products-(1).jpg", alt: "Image 1" },
  //   { url: "/George/products-images-250px/products-(2).jpg", alt: "Image 1" },
  //   { url: "/George/products-images-250px/products-(3).jpg", alt: "Image 1" },
  //   { url: "/George/products-images-250px/products-(4).jpg", alt: "Image 1" },
  //   { url: "/George/products-images-250px/products-(5).jpg", alt: "Image 1" },
  //   { url: "/George/products-images-250px/products-(6).jpg", alt: "Image 1" },

  //   // ... 更多圖片
  // ];

  const router = useRouter();
  const [listData, setListData] = useState({
    totalPages: 0,
    totalRows: 0,
    page: 0,
    rows: [],
  });
  // Delete
  const delItem = (ab_id) => {
    console.log({ ab_id });
    fetch(`${AB_DEL_DELETE}/${ab_id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        // alert(data.success)
        if (data.success) {
          //URL 和原本是一樣的，目的是讓router 去update component
          router.push(location.search, undefined, { scroll: false });
        }
      });
  };
  useEffect(() => {
    if (!router.isReady) return;
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(`${AB_LIST}${location.search}`, { signal })
      .then((r) => r.json())
      .then((obj) => {
        // console.log(obj);
        if (obj.success) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
    return () => {
      controller.abort();
    };
  }, [router]);
  console.log(listData); // render 時就會執行

  return (
    <>
      <Nav />
      {/* <ProductsGenres images={images}/> */}
      {/* <ProductsGenres /> */}
      <div>
        <ul>
          {listData.rows?.map((v, i) => {
            return (
              <>
                <li>{v.p_albums_id}</li>
                <li>{v.p_albums_title}</li>
              </>
            );
          })}
        </ul>
      </div>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
