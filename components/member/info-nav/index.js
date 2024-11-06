import React from 'react';
import styles from './info-nav.module.css'; // 引入相應的 CSS 模組

const InfoNav = () => {
  return (
    <div className={styles["info-nav"]}>
      <h4 className={styles["nav-title"]}>會員中心</h4>
      <div className={styles["nav-body"]}>
        <h5 className={styles["body-text"]}>基本資料</h5>
        <h5 className={styles["body-text"]}>帳號設定</h5>
        <h5 className={styles["body-text"]}>變更密碼</h5>
        {/* <h5 className={styles["body-text"]}>訂單查詢</h5> */}
        <h5 className={styles["body-text"]}>收藏名單</h5>
        {/* <h5 className={styles["body-text"]}>上傳作品</h5> */}
        {/* <h5 className={styles["body-text"]}>帳號刪除</h5> */}
      </div>
    </div>
  );
};

export default InfoNav;
