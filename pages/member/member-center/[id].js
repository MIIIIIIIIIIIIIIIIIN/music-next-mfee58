import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React, { useRef } from "react";


import styles from "./mem-blog.module.css";

import Nav from "@/components/public/nav";
import InfoNav from "@/components/member/info-nav";
import MemberInfo from "@/components/member/mem-info/member-info copy";
import MemberACC from "@/components/member/mem-acc/mem-acc";
import MemberPassword from "@/components/member/mem-password";
import MemberFav from "@/components/member/mem-fav";
import Mp3Uploader from "@/components/public/mp3-uploader";
import MemberFavTest from "@/components/member/mem-fav/test";
import BlogNav from "@/components/member/blog-nav";
import UserIcon from "@/components/public/user-icon";
import PlayButton from "@/components/public/play-button";
import Link from "next/link";

const MemberCenter = () => {
  const infoRef = useRef(null);
  const accRef = useRef(null);
  const passwordRef = useRef(null);
  const favRef = useRef(null);
  const uploaderRef = useRef(null);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <Nav />

        <div className={styles["container"]}>
          <div className={styles["leftContent"]}>
            <InfoNav
              onScrollToInfo={() => scrollToSection(infoRef)}
              onScrollToAcc={() => scrollToSection(accRef)}
              onScrollToPassword={() => scrollToSection(passwordRef)}
              onScrollToFav={() => scrollToSection(favRef)}
              onScrollToUploader={() => scrollToSection(uploaderRef)}
            />
          </div>
          <div className={styles["rightContent"]}>
            <div ref={infoRef}>
              <MemberInfo />
            </div>
            <img src="/image/img-mem/line005.png" alt="" />

            <div ref={accRef}>
              <MemberACC />
            </div>
            <img src="/image/img-mem/line005.png" alt="" />

            <div ref={passwordRef}>
              <MemberPassword />
            </div>
            <img src="/image/img-mem/line005.png" alt="" />

            <div ref={favRef}>
              <MemberFav />
              <MemberFavTest />
            </div>
            
            {/* <div ref={uploaderRef}>
              <Mp3Uploader />
            </div> */}
          </div>
        </div>

        <div className={styles["footer"]}>.</div>
      </div>
    </>
  );
};

export default MemberCenter;
