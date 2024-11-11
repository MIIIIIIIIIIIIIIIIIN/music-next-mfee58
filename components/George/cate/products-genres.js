import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/George/george-components/buttons";
import Heart from "@/components/George/george-components/hearts";
import WhiteWBtns from "@/components/George/george-components/white_wbtns";
import styles from "./cate.module.css";
import PlayButton from "@/components/George/george-components/play-button";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { AB_Genres_POST } from "@/config/api-path";
import { useRouter } from "next/router";

export default function ProductsGenres({ listData, albumsimg, genres }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const carouselRef = useRef(null);
  const carouse = useRef();
  const [visibleItems, setVisibleItems] = useState(8);
  const [rightSidePic, setRightSidePic] = useState([]);
  const [changingPics, setChangingPics] = useState([]);
  const [rightPicsController, setRightPicsController] = useState(false);
  const [rightVisibleController, setRightVisibleController] = useState(false);
  const [imgDistance, setImgDistance] = useState(0);
  const [rightDes, setRightDes] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 8);
  };

  const handleThumbnailClick = (index) => {
    setChangingPics(rightSidePic[index]);
    setRightPicsController(false);
  };

  const handleCategoryClick = async (genres) => {
    setLoading(true); // 顯示 loading 狀態
    try {
      console.log("Sending genres:", genres);
      const response = await axios.post(
        "http://localhost:3005/api/postGenres",
        { genres }
      );
      console.log("Response received:", response.data);
      setAlbumData(response.data); // 設定接收到的專輯資料
    } catch (error) {
      console.error("Error fetching albums:", error);
    } finally {
      setLoading(false); // 隱藏 loading 狀態
    }
  };

  const handleAlterRight = (albumId) => {
    // const imagesgroup = listData.rows.find((album) => album.p_albums_id === albumId);
    const albumImages = albumsimg[albumId] || [];
    const imageFilenames = albumImages.map(
      (image) => image.p_productsimg_filename
    );

    const imagesDescription = listData.rows.find(
      (album) => albumId === album.p_albums_id
    );
    const imagesDes = imagesDescription.p_albums_description;

    console.log(imagesDes);
    console.log(albumId);

    setRightSidePic(imageFilenames);
    setRightPicsController(true);
    setRightVisibleController(true);
    setRightDes(imagesDes);
  };

  const handlePrev = () => {
    // 計算新的 position
    const newPosition = position + 50;
    // 確保位置不超過左邊界
    if (newPosition <= 0) {
      setPosition(newPosition);
    } else {
      console.log("Already at the leftmost position");
    }
  };

  const handleNext = () => {
    // 計算新的 position
    const newPosition = position - 50;
    // 確保位置不超過右邊界
    if (newPosition >= -imgDistance) {
      setPosition(newPosition);
    } else {
      console.log("Already at the rightmost position");
    }
  };

  useEffect(() => {
    // 計算圖片的總寬度
    const thumbnailsToShow = rightSidePic.length * 25;
    setImgDistance(thumbnailsToShow);
  }, [rightSidePic]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.left = `${position}px`;
    }
  }, [position]);

  return (
    <>
      <div className={styles.searchingBarContainer}>
        <div className={styles.searchingToolsBox}>
          <input
            type="text"
            name="searchingBar"
            className={styles.searchingBar}
            placeholder="搜尋"
          />
          <button className={styles.toGoBts}>
            <FaArrowRight />
          </button>
        </div>
        <div>
          {genres.map((v, i) => (
            <button
              key={i}
              className={styles.genresBts}
              onClick={() => {
                handleCategoryClick(v.p_genres_name);
              }}
            >
              {v.p_genres_name}
            </button>
          ))}
        </div>
      </div>
      {/* 分類詳細資料 */}
      <div className={styles.container}>
        <div className={styles.left}>
          <ul
            className={
              rightVisibleController
                ? styles.albumListThinner
                : styles.albumList
            }
          >
           {albumData && albumData.length > 0
  ? albumData.slice(0, visibleItems).map((album) => (
      <li key={album.p_albums_id} className={rightVisibleController ? styles.Helloli : styles.Byeli}>
        <div className={styles.link}>
          {/* images */}
          <div className={styles.crossImg} onClick={() => handleAlterRight(album.p_albums_id)}>
            {albumsimg[album.p_albums_id] && albumsimg[album.p_albums_id][0] && (
              <img
                key={albumsimg[album.p_albums_id][0].p_productsimg_id}
                className={styles.cursorPointer}
                src={albumsimg[album.p_albums_id][0].p_productsimg_filename}
                alt={albumsimg[album.p_albums_id][0].p_productsimg_filename}
              />
            )}
          </div>
          <div className={styles.imgdes}>
            <h3>{album.p_albums_title}</h3>
            <p>{album.p_albums_description}</p>
          </div>
          <div className={styles.bottom}></div>
        </div>
      </li>
    ))
  : listData.rows.slice(0, visibleItems).map((album) => (
      <li key={album.p_albums_id} className={rightVisibleController ? styles.Helloli : styles.Byeli}>
        <div className={styles.link}>
          {/* images */}
          <div className={styles.crossImg} onClick={() => handleAlterRight(album.p_albums_id)}>
            {albumsimg[album.p_albums_id] && albumsimg[album.p_albums_id][0] && (
              <img
                key={albumsimg[album.p_albums_id][0].p_productsimg_id}
                className={styles.cursorPointer}
                src={albumsimg[album.p_albums_id][0].p_productsimg_filename}
                alt={albumsimg[album.p_albums_id][0].p_productsimg_filename}
              />
            )}
          </div>
          <div className={styles.imgdes}>
            <h3>{album.p_albums_title}</h3>
            <p>{album.p_albums_description}</p>
          </div>
          <div className={styles.bottom}></div>
        </div>
      </li>
    ))}
          </ul>
          <div className={styles.morecontroller}>
            {visibleItems < listData.rows.length && (
              <button className={styles.moreButton} onClick={handleLoadMore}>
                MORE
              </button>
            )}
          </div>
        </div>

        {/* right */}
        {rightVisibleController ? (
          <div className={styles.right}>
            <div className={styles.img}>
              <div className={styles.bg}>
                {rightPicsController ? (
                  <img src={rightSidePic[0]} className={styles.cursorPointer} />
                ) : (
                  <img src={changingPics} className={styles.cursorPointer} />
                )}
              </div>
              <div className={styles.carouse}>
                <button className={styles.button} onClick={handlePrev}>
                  <IoIosArrowBack />
                </button>
                <div className={styles.crossSm}>
                  <ul
                    className={styles.sm}
                    ref={carouselRef}
                    style={{ left: `${position}px` }}
                  >
                    {Array.isArray(rightSidePic) &&
                      rightSidePic.map((image, index) => (
                        <li key={index} className={styles.crossSmImg}>
                          <img
                            src={image}
                            onClick={() => handleThumbnailClick(index)}
                            className={styles.cursorPointer}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
                <button className={styles.button} onClick={handleNext}>
                  <IoIosArrowForward />
                </button>
              </div>
              <Link href={"/George/products-detail"}>
                <button className={styles.buttonBig}>
                  <p>前往專輯</p>
                </button>
              </Link>
              <button className={styles.buttonBig}>
                <p>我的最愛</p>
              </button>
              <div className={styles.albumsdes}>{}</div>
              <div className={styles.combo}>
                <div className={styles.PlayButton}>
                  <PlayButton />
                </div>
                <div className={styles.rightDescription}>{rightDes}</div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
