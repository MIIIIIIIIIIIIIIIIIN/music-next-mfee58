import styles from "./add-to-cart.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import Logo from "../logo";
import Link from "next/link";
import useFetchDB from "@/components/George/hooks/usefetchDB";

export const AddToCartBar = ({ memAuth }) => {
  const [atBottom, setAtBottom] = useState(false);
  const { mdBox, urid } = useFetchDB();

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

  const handleAuth = () => {
    if (!memAuth ) {
      alert('請先登入會員才能進行贊助！');
      window.location='http://localhost:3000/login'
      return;
    }else{
      window.location = 'http://localhost:3000/George/cart'
    }
  }

  return (
    <>
      <div className={`${styles["cart-icon-container"]}`}>
        <div className={styles["cart-icon"]}>
          <BsCart4 size={48} />
        </div>
        <div className={styles.bigwordsandlogo}>
          <div className={`${styles["cart-expanded"]}`}>
            <div className={styles["frame"]}>
              <Logo type={2} />
              <div className={styles["bottom-bar-buttons"]}>
                <button className={styles["barbutton-addtocart"]}>
                  <div className={styles["text-wrapper-4"]}>Add to Cart</div>
                </button>
                <Link href={"/George/cart/urid"}>
                  <button className={styles["div-wrapper"]} onClick={handleAuth}>
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
