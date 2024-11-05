// components/home/daily/index.js
import React, { useState, useEffect } from 'react';
import styles from "./daily.module.css";
import Heart from "@/components/public/hearts";
import TimelineComponent from "./time-line";

// 生成過去7天的數據
const generateDailyData = () => {
  const today = new Date();
  const data = [];
  
  // 生成過去7天的數據（包含今天）
  for(let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date,
      image: i === 0 ? './day.jpg' : `./George/products-images-250px/products-(${i}).jpg`,
      title: i === 0 ? 'RUNAWAY' : `DAY ${6-i}`,
      subtitle: i === 0 ? 'JEANS' : `STYLE ${6-i}`,
      content: i === 0 ? '今天的內容' : `${i}天前的內容`,
      description: i === 0 ? '這是今天的詳細內容描述' : `這是${i}天前的詳細內容描述`
    });
  }
  
  return data;
};

const Daily = () => {
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const data = generateDailyData();
    setAllData(data);
    setCurrentData(data[data.length - 1]); // 預設顯示今天的數據
  }, []);

  const handleTimelineChange = (data) => {
    setCurrentData(data);
  };

  if (!currentData || !allData.length) return null;

  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <a href="#">
          <div className={styles.rectangleWrapper}>
            <img className={styles.frameChild} alt="" src={currentData.image} />
          </div>
          <div className={styles.runawayParent}>
            <div className={styles.runaway}>{currentData.title}</div>
            <div className={styles.jeans}>{currentData.subtitle}</div>
          </div>
        </a>
      </div>
      <div className={styles.frameContainer}>
        <TimelineComponent 
          data={allData}
          currentData={currentData}
          onDataChange={handleTimelineChange}
        />
      </div>
    </div>
  );
};

export default Daily;