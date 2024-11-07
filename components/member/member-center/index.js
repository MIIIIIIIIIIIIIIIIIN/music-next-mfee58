import React, { useRef } from "react";
import styles from "./member-center.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav";
import MemberInfo from "../mem-info/member-info";
import MemberACC from "../mem-acc/mem-acc";
import MemberPassword from "../mem-password";
import MemberFav from "../mem-fav";
import Mp3Uploader from "@/components/public/mp3-uploader";

const MemWeb2 = () => {
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
        <Nav className={styles["nav"]} />

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
            <div ref={accRef}>
              <MemberACC />
            </div>
            <div ref={passwordRef}>
              <MemberPassword />
            </div>
            <div ref={favRef}>
              <MemberFav />
            </div>
            {/* <div ref={uploaderRef}>
              <Mp3Uploader />
            </div> */}
          </div>
        </div>

        <div className={styles["footer"]}>Footer</div>
      </div>
    </>
  );
};

export default MemWeb2;
