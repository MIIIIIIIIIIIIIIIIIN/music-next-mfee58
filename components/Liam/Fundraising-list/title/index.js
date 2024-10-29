import React from 'react';
import styles from './title.module.css'
export default function FundraisingTitle({text='xxx'}) {
  return (
    <div className={styles.container}>
      <h3>{text}</h3>
    </div>
  )
}
