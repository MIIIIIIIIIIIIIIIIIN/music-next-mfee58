import React, { useState } from 'react';
import NewsCardItem from "./new-card-item";
import NewsCardDetailItem from "./new-card-detail-item";

const NewsCard = ({ newsItems }) => {
  const [selectedNews, setSelectedNews] = useState(null);

  // 處理點擊卡片事件
  const handleCardClick = (index) => {
    console.log('Card clicked:', index); // 添加日誌
    setSelectedNews(index);
  };

  // 返回列表
  const handleBackToList = () => {
    setSelectedNews(null);
  };

  return (
    <div style={{ width: '100%' }}>
      {selectedNews === null ? (
        // 顯示新聞列表
        <div>
          {newsItems.map((item, index) => (
            <NewsCardItem
              key={index}
              date={item.date}
              title={item.title}
              description={item.description}
              image={item.image}
              onClick={() => {
                console.log('NewsCardItem clicked, index:', index); // 添加日誌
                handleCardClick(index); // 修改這裡，傳遞實際的索引而不是固定值 1
              }}
            />
          ))}
        </div>
      ) : (
        // 顯示選中的新聞詳情
        <NewsCardDetailItem
          {...newsItems[selectedNews]}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default NewsCard;