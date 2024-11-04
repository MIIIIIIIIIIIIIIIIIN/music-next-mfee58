import React from "react";
import styles from "./blog-nav.module.css"; // 引入相應的 CSS 模組
import UserIcon from "@/components/public/user-icon";

const BlogNav = () => {
  return (
    <div className={styles["blogNav"]}>
      <div className={styles["icon"]}>
        <UserIcon />
      </div>
      <h4 className={styles["name"]}>Guava</h4>
      <div className={styles["info"]}>
        <div className="gender">其他</div>
        <div className={styles["else"]}>
          <div className="birth">11.30</div>
          <div className="location">Taipei</div>
        </div>
      </div>
      <div className={styles["status"]}>
        <h7>Love & Peace</h7>
        {/* <h7>Love & Peace</h7>
        <h7>Love & Peace</h7>
        <h7>Love & Peace</h7>
        <h7>Love & Peace</h7> */}
      </div>
    </div>
  );
};

export default BlogNav;
