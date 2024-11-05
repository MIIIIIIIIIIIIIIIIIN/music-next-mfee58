import React from "react";
import styles from "./sort-button.module.css";

const SortingButton = ({ type, onClick, children, isActive }) => {
  const buttonClass = `${styles.btn} ${styles[`btn-${type}`]}`;
  const buttonHoverClass = styles[`btn-${type}-hover`];

  return (
    <button
      className={buttonClass}
      onMouseOver={(e) => e.currentTarget.classList.add(buttonHoverClass)}
      onMouseOut={(e) => e.currentTarget.classList.remove(buttonHoverClass)}
      onClick={onClick}
    >
      <span className={styles["text-wrapper"]}>
        {children}
        {isActive && <span className={styles.indicator} />}
      </span>
    </button>
  );
};

export default SortingButton;
