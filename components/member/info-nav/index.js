import React from 'react';
import styles from './info-nav.module.css'; // 引入相應的 CSS 模組

const InfoNav = () => {
  return (
    <div className={styles["info-nav"]}>
      <h5 className={styles["nav-title"]}>會員中心</h5>
      <div className={styles["nav-body"]}>
        <h6 className={styles["body-text"]}>基本資料</h6>
        <h6 className={styles["body-text"]}>帳號設定</h6>
        <h6 className={styles["body-text"]}>變更密碼</h6>
        <h6 className={styles["body-text"]}>訂單查詢</h6>
        <h6 className={styles["body-text"]}>收藏名單</h6>
        <h6 className={styles["body-text"]}>帳號刪除</h6>
      </div>
    </div>
  );
};

export default InfoNav;
