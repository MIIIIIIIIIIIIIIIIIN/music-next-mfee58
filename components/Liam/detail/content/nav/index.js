import React from 'react'
import styles from './detail-nav.module.css'
export default function DetailNav() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h6>專案內容</h6>
        </li>
        <li className={styles.item}>
          <h6>常見問題</h6>
        </li>
        <li className={styles.item}>
          <h6>最新消息</h6>
        </li>
        <li className={styles.item}>
          <h6>留言</h6>
        </li>
      </ul>
    </div>
  )
}
