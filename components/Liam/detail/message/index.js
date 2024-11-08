import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./message.module.css";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

const CommentItem = () => {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  const organizeByFloor = (messages) => {
    const sortedMessages = [...messages].sort((a, b) => 
      a.f_message_floor - b.f_message_floor
    );

    const floorGroups = {};
    
    sortedMessages.forEach(message => {
      const floor = message.f_message_floor;
      if (!floorGroups[floor]) {
        floorGroups[floor] = {
          userMessage: null,
          sellerResponse: null
        };
      }

      if (message.f_sale === 1) {
        floorGroups[floor].sellerResponse = message;
      } else {
        floorGroups[floor].userMessage = message;
      }
    });

    return Object.entries(floorGroups)
      .sort(([floorA], [floorB]) => Number(floorA) - Number(floorB));
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!router.isReady) return;

        const { project } = router.query;
        setIsLoading(true);

        const response = await fetch(`http://localhost:3005/fundraiser/message/${project}`);
        const data = await response.json();
        const organizedComments = organizeByFloor(data.rows);
        setComments(organizedComments);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [router.isReady]);

  const FloorMessage = ({ floorNumber, userMessage, sellerResponse }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className={styles.floorContainer}>
        {userMessage && (
          <div className={styles.messageCard}>
            <div className={styles.messageContent}>
              <div className={styles.avatar}>
                用戶
              </div>
              <div className={styles.mainContent}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    用戶 {userMessage.f_member_id}
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(userMessage.f_message_current).toLocaleString()}
                  </span>
                </div>
                <div className={styles.messageBody}>
                  <h4 className={styles.messageTitle}>{userMessage.f_message_title}</h4>
                  <p className={styles.messageText}>{userMessage.f_message_content}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {sellerResponse && (
          <div className={styles.toggleReplies}>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.toggleButton}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-1" />
                  收起賣家回覆
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1" />
                  查看賣家回覆
                </>
              )}
            </button>
          </div>
        )}

        {isExpanded && sellerResponse && (
          <div className={`${styles.messageCard} ${styles.replyCard} ${styles.sellerResponse}`}>
            <div className={styles.messageContent}>
              <div className={styles.avatar}>
                賣家
              </div>
              <div className={styles.mainContent}>
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    <span className={styles.customerService}>【賣家回覆】</span>
                  </span>
                  <span className={styles.messageTime}>
                    {new Date(sellerResponse.f_message_current).toLocaleString()}
                  </span>
                </div>
                <div className={styles.messageBody}>
                  <h4 className={styles.messageTitle}>{sellerResponse.f_message_title}</h4>
                  <p className={styles.messageText}>{sellerResponse.f_message_content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 計算總頁數
  const totalPages = Math.ceil(comments.length / itemsPerPage);

  // 獲取當前頁面的留言
  const getCurrentPageComments = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return comments.slice(startIndex, endIndex);
  };

  // 處理頁面變更
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 載入中狀態
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>載入中...</p>
      </div>
    );
  }

  // 無資料狀態
  if (!comments.length) {
    return <div className={styles.emptyContainer}>暫無留言</div>;
  }

  return (
    <div className={styles.messageContainer}>
      {getCurrentPageComments().map(([floor, { userMessage, sellerResponse }]) => (
        <FloorMessage
          key={floor}
          floorNumber={floor}
          userMessage={userMessage}
          sellerResponse={sellerResponse}
        />
      ))}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.pageButton}
          >
            <ChevronLeft size={16} />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`${styles.pageButton} ${
                currentPage === index + 1 ? styles.activePage : ''
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;