import styles from "./add-to-cart.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";

export const AddToCartBar = () => {
  const [show, setShow] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const comparingScroll = () => {
      const scrollDistency = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollDistency + windowHeight == documentHeight) {
        setAtBottom(true);
      } else {
        setAtBottom(false);
      }
    };

    window.addEventListener("scroll", comparingScroll);

    return () => {
      window.removeEventListener("scroll", comparingScroll);
    };
  }, []);

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handlerScroll);
    return () => {
      window.removeEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <>
      {atBottom ? (
        <div className={`${styles["cart-icon-container"]}`}>
          <div className={styles["cart-icon"]}>
            <BsCart4 size={32} />
          </div>
            <div className={`${styles["cart-expanded"]}`}>
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
                  <button className={styles["text-wrapper-2"]}>
                    Privacy Policy
                  </button>
                  <div className={styles["delete"]}>
                    <TiDeleteOutline />
                  </div>
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
          </div>
        
      ) : (
        <>
          <div
            className={`${styles["button-bar"]} ${show ? styles["show"] : ""}`}
          >
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
                  <button className={styles["text-wrapper-2"]}>
                    Privacy Policy
                  </button>
                  <div className={styles["delete"]}>
                    <TiDeleteOutline />
                  </div>
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
        </>
      )}
    </>
  );
};
