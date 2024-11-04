import styles from "./add-to-cart.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import Logo from "../logo";
import Link from "next/link";

export const AddToCartBar = () => {
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

  return (
    <>
      <div className={`${styles["cart-icon-container"]}`}>
        <div className={styles["cart-icon"]}>
          <BsCart4 size={48} />
        </div>
        <div className={styles.bigwordsandlogo}>
          <div className={`${styles["cart-expanded"]}`}>
            <div className={styles["frame"]}>
              <Logo type={2}/>
              <div className={styles["bottom-bar-buttons"]}>
                <button className={styles["barbutton-addtocart"]}>
                  <div className={styles["text-wrapper-4"]}>Add to Cart</div>
                </button>
                <Link href={"/George/products-cart-page"}>
                <button className={styles["div-wrapper"]}>
                  <div className={styles["text-wrapper-4"]}>Cart</div>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
