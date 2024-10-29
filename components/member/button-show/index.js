import React, { useState } from 'react';
import styles from './ButtonShowM.module.css';

const ButtonToggleM = ({ size = "large" }) => {
  const [isHidden, setIsHidden] = useState(false);

  // 根據 size prop 決定按鈕大小樣式
  const sizeClass = size === "small" 
    ? styles.small 
    : size === "medium" 
    ? styles.medium 
    : styles.large;

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${sizeClass} ${isHidden ? styles.hiddenButton : styles.showButton}`}
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? '隱藏於頁面' : '顯示於頁面'}
      </button>
    </div>
  );
};

export default ButtonToggleM;
