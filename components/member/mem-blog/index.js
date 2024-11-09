import React, { useEffect, useState } from "react";
import styles from "./mem-blog.module.css"; // 引入相應的 CSS 模組
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "../blog-nav";
import PlayButton from "@/components/public/play-button";
import Logout from "@/components/public/logout";

const MemBlog = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include", // 攜帶 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        console.log(data);

        setName(data.admin?.nickname); // 確保讀取 admin 裡的 nickname
        setBirth(data.admin?.birth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles["wrapper"]}>
        <Nav className={styles["nav"]} />
        {/* 設定圖標，放置在右上角 */}
        <a href="/Jade/member-center">
          <img
            src="/icons/icon-setting.svg"
            alt="設定"
            className={styles["settingIcon"]}
          />
        </a>

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            {/* <InfoNav /> */}
            <BlogNav value={name} />
            <button>
              <a href="./login">Login</a>
            </button>

              <a href="/login"><Logout /></a>
          </div>

          <div className={styles["rightContent"]}>
            <div className={styles["albumSec"]}>
              <div className={styles["album"]}>
                <div className="icon"></div>
                <UserIcon />
              </div>

              <div className={styles["album"]}>
                <PlayButton size="large" />
              </div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
              <div className={styles["album"]}>album</div>
            </div>
          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemBlog;
