import React, { useState, useEffect } from "react";
import { AB_LIST, AB_DEL_DELETE } from "@/config/api-path";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductsGenres from "@/components/George/card/products-genres";
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
    handleResize();
    window.addEventListener("resize", handleResize);
    const handleScroll = () => {
      setIsNavVisible(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  const [listData, setListData] = useState({
    totalPages: 0,
    totalRows: 0,
    page: 0,
    rows: [],
  });
  const [albumsimg, setAlbumsImg] = useState({
    rowss: [],
  })

  // Delete
  const delItem = (p_albums_id) => {
    console.log({ p_albums_id });
    fetch(`${AB_DEL_DELETE}/${p_albums_id}`, {
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

  // 從後端抓資料
  useEffect(() => {
    if (!router.isReady) return;
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(`${AB_LIST}${location.search}`, { signal })
      .then((r) => r.json())
      .then((obj) => {
        console.log("我是物件: ", obj);
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

    // 從後端抓圖片
    useEffect(() => {
      if (!router.isReady) return;
      const controller = new AbortController();
      const signal = controller.signal;
      fetch(`${AB_LIST}${location.search}`, { signal })
        .then((r) => r.json())
        .then((obj) => {
          console.log("我是物件: ", obj);
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

  console.log(listData);
   // render 時就會執行

  return (
    <>
      <Nav />
      <ProductsGenres listData={listData}/>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
