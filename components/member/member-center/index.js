import React from "react";
import styles from "./member-center.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav";
import MemberInfo from "../mem-info/member-info";
import MemberACC from "../mem-acc/mem-acc";
import MemberPassword from "../mem-password";
import MemberFav from "../mem-fav";
import Mp3Uploader from "@/components/public/mp3-uploader";


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
          <div className={styles["rightContent"]}>
            <MemberInfo />
            <MemberACC />
            <MemberPassword />
            <MemberFav />
            <Mp3Uploader />
            

          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemWeb2;
