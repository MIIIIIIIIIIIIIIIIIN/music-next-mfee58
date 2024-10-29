import React from 'react'
import styles from './kv.module.css'

export default function Kv({title='Farragol | 《 MindCapsule 》透明灰彩膠 | 黑膠'}) {
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.title}>
          <a href="#">
            <h3>{title}</h3>
            <p>80%</p>
            <a href="#">---</a>
          </a>
        </div>
        
      </div>
      <div className={styles.bottom}>
        <div className={styles.bar} style={{}}></div>
      </div>
    </div>
  )
}
