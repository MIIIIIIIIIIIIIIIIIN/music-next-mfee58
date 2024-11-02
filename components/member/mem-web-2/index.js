import React from "react";
import styles from "./mem-web-2.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav";
import MemberACC from "../mem-acc/mem-acc";
import MemIcons from "../mem-icons";
import UserIcon from "@/components/public/user-icon";

const MemWeb2 = () => {
  return (
    <>
      <div className={styles["wrapper"]}>
        <Nav className={styles["nav"]} />

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            <InfoNav />
          </div>
          <div className={styles["rightContent"]}>右邊內容
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          <UserIcon />
          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemWeb2;
