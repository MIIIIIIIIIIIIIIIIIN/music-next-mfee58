import PropTypes from "prop-types";
import React from "react";
import styles from "./ProfileIcons.module.css"; // 引入模組化 CSS

export const ProfileIcons = ({ property1, className, img='' }) => {
  return (
    <div className={`${styles.profileIcons} ${styles[property1]} ${className}`}>
      <img src={img} alt="" />
    </div>
  );
};

ProfileIcons.propTypes = {
  property1: PropTypes.oneOf(["md", "lg", "XS"]),
};
