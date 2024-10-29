import styles from "./add-to-cart.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";

// 這裡的暫時無法透過前端簡易伺服器開啟SVG，需要透過後端伺服器修改MIME image/svf+xml

export const AddToCartBar = () => {
  const [show, setShow] = useState(false)

  useEffect(()=>{
    const handlerScroll= ()=>{
      if(window.scrollY > 50){
        setShow(true)
      } else {
        setShow(false)
      }
    };
      window.addEventListener('scroll', handlerScroll)
      return()=>{ // 在useEffect 中的return 並不是普通的函數返回值，同時也用於定義一個清理函數(clean function)，此函數會在component unmount 或依賴變化(依賴陣列改變時)時執行。
        window.removeEventListener('scroll',handlerScroll)
    };
  },[])


  return (
    <div className={`${styles["button-bar"]} ${show ? styles["show"] : ''}`}>

      <div className={styles["frame"]}>
        <div className={styles["logo-vertical"]}>
          <div className={styles["guava-vibe"]}>GuavaVibe</div>
        </div>
        <div className={styles["buttonbar-content"]}>
          <p className={styles["text-wrapper"]}>
            Available for international shipping by Fedex
          </p>
          <div className={styles["small-words"]}>
            <button className={styles["div"]}>How to use</button>
            <FaHandPointRight />
            <div className={styles["finger2"]}>
              <FaHandPointRight />
            </div>
            <button className={styles["text-wrapper-2"]}>Privacy Policy</button>
            <div className={styles['delete']}><TiDeleteOutline /></div>
            <div className={styles["text-wrapper-3"]}>
              Ignore WorldShopping service
            </div>
          </div>
        </div>
      </div>
      <div className={styles["bottom-bar-buttons"]}>
        <button className={styles["barbutton-addtocart"]}>
          <div className={styles["text-wrapper-4"]}>Add to Cart</div>
        </button>
        <div className={styles["div-wrapper"]}>
          <div className={styles["text-wrapper-4"]}>Cart</div>
        </div>
      </div>
      </div>
  );
};
