import React, { useState, useEffect } from "react";
import { AB_LIST, AB_DEL_DELETE } from "@/config/api-path";
import Link from "next/link";
import { useRouter } from "next/router";
import ProductsGenres from "@/components/George/cate/products-genres";
import FooterDeskTop from "@/components/public/footer/desktop";
import FooterMobile from "@/components/public/footer/mobile";
import Nav from "@/components/public/nav";
import axios from "axios";

export default function ProductsFilter() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavMobile, setIsNavVisible] = useState(false);
  const [listData, setListData] = useState({ rows: [] });
  const [albumsimg, setAlbumsImg] = useState({});
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  // 處理螢幕寬度變化
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

  // 抓抓資料
  useEffect(() => {
    if (!router.isReady) return;
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(`${AB_LIST}${location.search}`, { signal })
      .then((r) => r.json())
      .then((obj) => {
        if (obj) {
          setListData(obj);
        } else if (obj.redirect) {
          router.push(obj.redirect);
        }
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      });
    return () => {
      controller.abort();
    };
  }, [router]);

  // 抓抓分類
  useEffect(()=>{
    const fetchGenres = async ()=>{
      try{
        const response = await axios.get("http://localhost:3005/api/getGenres"); //ask back-end
        setGenres(response.data) // put the data in the status
      } catch(error) {
        console.error("Error fetching genres: ", error);
      }
    }
    fetchGenres();
  }, [genres])

  // 抓圖片唷
  useEffect(() => {
    if (listData.rows.length === 0) return;
    const controller = new AbortController();
    const signal = controller.signal;
    const getImages = async () => {
      await Promise.all(
        listData.rows.map((album) => {
          fetch(`${AB_LIST}/${album.p_albums_id}`, { signal }).then((r) => {
            r.json()
              .then((imgObj) => {
                if (imgObj) {
                  setAlbumsImg((abimg) => ({
                    ...abimg,
                    [album.p_albums_id]: imgObj.images,
                  }));
                }
              })
              .catch((error) => {
                if (error.name === "AbortError") {
                  console.log("Fetch aborted");
                } else {
                  console.error("Fetch error:", error);
                }
              });
          });
        })
      );
    };
    getImages();
    return () => {
      controller.abort();
    };
  }, [listData]);

  return (
    <>
      <Nav />
      <ProductsGenres listData={listData} albumsimg={albumsimg} genres={genres}/>
      {isMobile ? <FooterMobile /> : <FooterDeskTop />}
    </>
  );
}
