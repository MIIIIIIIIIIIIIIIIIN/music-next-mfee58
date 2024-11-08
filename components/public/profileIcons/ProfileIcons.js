import PropTypes from "prop-types";
import React from "react";
import styles from "./ProfileIcons.module.css"; // 引入模組化 CSS

export const ProfileIcons = ({ property1, className, img }) => {
  // 設定預設圖示的路徑
  const defaultIcons = "/image/img-Jade/default.jpg";

// public/image/img-Jade/default.jpg

  return (
    <div className={`${styles.profileIcons} ${styles[property1]} ${className}`}>
      <img src={img || defaultIcons} alt="Profile Icon" />
    </div>
  );
};

ProfileIcons.propTypes = {
  property1: PropTypes.oneOf(["md", "lg", "XS"]),
  img: PropTypes.string,
};
