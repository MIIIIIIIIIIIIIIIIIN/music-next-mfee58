import React from 'react';
import styles from './new-card-detail-item.module.css';
import { ArrowLeft } from 'lucide-react';

const NewsCardDetailItem = ({ date, title, description, image, onBack }) => {
  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={onBack}>
      <ArrowLeft size={20} />
      返回
      </button>
      
      <span className={styles.date}>{date}</span>
      
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <article className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.description}>{description}</div>
      </article>
    </div>
  );
};

export default NewsCardDetailItem;