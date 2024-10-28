import React, { useState } from 'react';
import styles from './ButtonShow.module.css'; // 正確引入 CSS 模組

const ButtonToggle = ({ size = "large" }) => {
  const [isLargeHidden, setIsLargeHidden] = useState(false);
  // const [isSmallHidden, setIsSmallHidden] = useState(false);


  
  
  // 切換大按鈕顯示狀態
  // const toggleLargeButton = () => {
  //   setIsLargeHidden(!isLargeHidden);
  // };

  // 切換小按鈕顯示狀態
  // const toggleSmallButton = () => {
  //   setIsSmallHidden(!isSmallHidden);
  // };

  const sizeClass = size === "small" ? styles.small : size === "large" ? styles.large : styles.medium;

  return (
    // <div className={styles['button-container']}>
    //   <button
    //     className={`${styles['large']} ${isLargeHidden ? styles['hidden-button'] : styles['show-button']}`}
    //     onClick={toggleLargeButton}
    //   >
    //     {isLargeHidden ? '隱藏於頁面' : '顯示於頁面'}
    //   </button>

    //   <button
    //     className={`${styles['small']} ${isSmallHidden ? styles['hidden-button'] : styles['show-button']}`}
    //     onClick={toggleSmallButton}
    //   >
    //     {isSmallHidden ? '隱藏於頁面' : '顯示於頁面'}
    //   </button>
    // </div>
    // 分隔線-------------------------------------------------------------------------------------

    <div className={styles.buttonContainer}>
      <button
        className={`${styles.large} ${isLargeHidden ? styles.hiddenButton : styles.showButton}`}
        onClick={() => setIsLargeHidden(!isLargeHidden)}
      >
        {isLargeHidden ? '隱藏於頁面' : '顯示於頁面'}
      </button>
{/*       
    <div
      className={`${styles.button} ${sizeClass} ${isPlaying ? styles.pause : styles.play}`} 
      onClick={handleButtonClick}
    >
      {isPlaying ? (
        <div className={styles.pauseIcon}>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div className={styles.playIcon}></div>
      )} */}
    </div>
  );
};

export default ButtonToggle;
