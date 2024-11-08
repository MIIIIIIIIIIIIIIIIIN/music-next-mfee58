import React, { useState, useRef } from "react";
import Button from "@/components/George/george-components/buttons";
import Heart from "@/components/George/george-components/hearts";
import WhiteWBtns from "@/components/George/george-components/white_wbtns";
import styles from "./cate.module.css";
import PlayButton from "@/components/George/george-components/play-button";
import Link from "next/link";

export default function ProductsGenres({ listData, albumsimg }) {
  // 查看 listData.rows 的內容
  // console.log("listData.rows:", listData.rows);
  console.log("albumsimg:", albumsimg);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const carouselRef = useRef(null);
  const thumbnailsToShow = albumsimg.length * 50;
  const carouse = useRef();

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };
  // console.log(thumbnailsToShow);
  // console.log(position);

  const handlePrev = () => {
    if (position > -thumbnailsToShow) {
      const newPosition = position - 50; // 向右移動 50px
      setPosition(newPosition);
      if (carouselRef.current) {
        carouselRef.current.style.left = `${newPosition}px`;
      }
    }
  };

  const handleNext = () => {
    if (position != 0) {
      const newPosition = position + 50; // 向左移動 50px
      setPosition(newPosition);
      if (carouselRef.current) {
        carouselRef.current.style.left = `${newPosition}px`;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ul>
          {listData.rows.map((album) => (
            <li key={album.p_albums_id}>
              <div
                className={styles.link}
                onClick={() => handleThumbnailClick(album.p_albums_id)}
              >
                {/* images */}
                <div className={styles.crossImg}>
                  {albumsimg[album.p_albums_id] &&
                    albumsimg[album.p_albums_id][0] && (
                      <img
                        key={albumsimg[album.p_albums_id][0].p_productsimg_id}
                        className={styles.cursorPointer}
                        src={
                          albumsimg[album.p_albums_id][0].p_productsimg_filename
                        }
                        alt={
                          albumsimg[album.p_albums_id][0].p_productsimg_filename
                        }
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
      </div>

      <div className={styles.right}>
        <div className={styles.img}>
          <div className={styles.bg}>
            <img
              src={albumsimg[currentIndex]?.p_productsimg_filename}
              className={styles.cursorPointer}
            />
          </div>
          <div className={styles.carouse}>
            <button className={styles.button} onClick={handleNext}>
              -
            </button>
            <div className={styles.crossSm}>
              <ul
                className={styles.sm}
                ref={carouselRef}
                style={{ left: `${position}px` }}
              >
                {Array.isArray(albumsimg) &&
                  albumsimg.map((image, index) => (
                    <li key={index} className={styles.crossSmImg}>
                      <img
                        src={image.p_productsimg_filename}
                        onClick={() =>
                          handleThumbnailClick(image.p_productsimg_id)
                        }
                        className={styles.cursorPointer}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <button className={styles.button} onClick={handlePrev}>
              +
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
          <div className={styles.PlayButton}>
            <PlayButton />
          </div>
        </div>
      </div>
    </div>
  );
}
