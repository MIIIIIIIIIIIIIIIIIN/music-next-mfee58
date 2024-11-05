import React, { useState } from 'react';
import styles from './question-item.module.css';

// 模擬後端資料結構

const QuestionAccordion = ({faqData}) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={styles.container}>
      {faqData.map(item => (
        <div 
          key={item.id} 
          className={`${styles.item} `}
        >
          <button
            className={styles.header}
            onClick={() => toggleItem(item.id)}
          >
            <div className={styles.headerContent}>
              <span className={styles.date}>{item.date}</span>
              <p className={styles.question}>{item.question}</p>
            </div>
            <span className={`${styles.arrow} ${openItems.has(item.id) ? styles.open : ''}`}>
              ›
            </span>
          </button>
          <div 
            className={`${styles.content} ${openItems.has(item.id) ? styles.expanded : ''}`}
          >
            <div className={styles.answer}>
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionAccordion;