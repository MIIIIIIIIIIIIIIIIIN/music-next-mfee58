import React from "react";
import styles from "./mem-web-2.module.css";
import Nav from "@/components/public/nav";
import MemIcons from "../mem-icons";
import UserIcon from "@/components/public/user-icon";
import InfoNav from "../info-nav";

const MemWeb2 = () => {
  return (
    <>
      <div className={styles["mem-web"]}>
        <Nav />
      </div>

      <div className={styles["container"]}>
        <div className={styles["sec1"]}>
          <div className="info">
            <InfoNav />
          </div>
          <div className="main">
            <MemIcons iconName="icon-mail" />
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
        <div className={styles["footer1"]}></div>
      </div>
    </>
  );
};

export default MemWeb2;
