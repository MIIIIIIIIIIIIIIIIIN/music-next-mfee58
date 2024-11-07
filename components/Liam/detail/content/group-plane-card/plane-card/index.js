import React from 'react';
import styles from './card.module.css';

const PlaneCard = ({ onSelect,e }) => {
  
  const handleSelect = () => {
    if (typeof onSelect === 'function') {
      const planData = {
        type: '優惠方案',
        name: '第一包! 優先購票資格最划算！',
        price: 1590
      };
      onSelect(planData);
    }
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.priceSection}>
        <span className={styles.price}>${e.f_plan_amount}</span>
      </h5>

      <div className={styles.imageContainer}>
        <img
          src={e.f_plan_picture}
          alt="Promotion"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{e.f_plan_title}</h3>

        <div className={styles.description}>
          {/* <p>未來市價 $1,490 → 現省 $1,610</p> */}
          <ul className={styles.list}>
            <li className={styles.info}>{e.f_plan_content}</li>
            {/* <li>演唱會早鳥證明 × 1</li> */}
          </ul>
        </div>
        <div className={styles.footer}>
          <span className={styles.stats}>幫助人次 • {e.f_plan_people}</span>
          <button 
            className={styles.button}
            onClick={handleSelect}
          >
            贊助專案 →
          </button>
        </div>
      </div>
    </div>
  );
};

PlaneCard.defaultProps = {
  onSelect: () => {}
};

export default PlaneCard;