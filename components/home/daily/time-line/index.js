import React, { useState, useEffect } from 'react';
import styles from './time-line.module.css';

const TimelineComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timelineItems, setTimelineItems] = useState([]);
  const [todayDate] = useState(new Date());
  
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `(${month}-${day})`;
  };

  const subtractDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - days);
    return newDate;
  };

  const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  };

  useEffect(() => {
    const today = new Date();
    const items = [
      {
        date: subtractDays(today, 1),
        content: '昨天的內容',
        description: '這是昨天的詳細內容描述。'
      },
      {
        date: today,
        content: '今天的內容',
        description: '這是今天的詳細內容描述，包含更多資訊。'
      },
      {
        date: addDays(today, 1),
        content: null,
        description: null
      }
    ];
    setTimelineItems(items);
  }, []);

  const handleClickTop = () => {
    if (timelineItems.length >= 3) {
      const newDate = subtractDays(timelineItems[0].date, 1);
      const newItems = [
        {
          date: newDate,
          content: `${newDate.getMonth() + 1}-${newDate.getDate()} 的內容`,
          description: `${newDate.getMonth() + 1}-${newDate.getDate()} 的詳細內容描述`
        },
        ...timelineItems.slice(0, -1)
      ];
      setTimelineItems(newItems);
    }
  };

  const handleClickBottom = () => {
    const canMoveDown = timelineItems[1]?.date < todayDate;
    if (timelineItems.length >= 3 && canMoveDown) {
      const newItems = [
        ...timelineItems.slice(1),
        {
          date: addDays(timelineItems[2].date, 1),
          content: null,
          description: null
        }
      ];
      setTimelineItems(newItems);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemsContainer}>
        {/* Top block - always compact */}
        {timelineItems.length > 0 && (
          <div 
            onClick={handleClickTop}
            className={styles.compactBlock}
          >
            <div className={styles.compactDate}>
              {formatDate(timelineItems[0].date)}
            </div>
          </div>
        )}

        {/* Middle block - always expanded */}
        <div className={styles.expandedBlock}>
          <div className={styles.expandedDate}>
            {formatDate(timelineItems[1]?.date || currentDate)}
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              {timelineItems[1]?.content || '今天的內容'}
            </div>
            <div className={styles.description}>
              {timelineItems[1]?.description}
            </div>
          </div>
        </div>

        {/* Bottom block - always compact */}
        {timelineItems.length > 2 && (
          <div 
            onClick={timelineItems[1]?.date < todayDate ? handleClickBottom : undefined}
            className={timelineItems[1]?.date < todayDate ? styles.compactBlock : styles.compactBlockDisabled}
          >
            <div className={styles.compactDate}>
              {formatDate(timelineItems[2].date)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineComponent;