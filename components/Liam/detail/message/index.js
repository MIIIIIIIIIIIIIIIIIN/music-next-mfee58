import React, { useState, useEffect } from "react";
import styles from "./message.module.css";
import { ChevronDown, ChevronUp } from 'lucide-react';

const CommentItem = () => {
  const [messages, setMessages] = useState([]);

  // 將留言資料轉換為樹狀結構
  const buildMessageTree = (messages) => {
    const messageMap = {};
    const rootMessages = [];

    // 先建立所有留言的映射
    messages.forEach(message => {
      messageMap[message.f_message_id] = {
        ...message,
        replies: []
      };
    });

    // 建立樹狀結構
    messages.forEach(message => {
      if (message.reply_to) {
        // 如果是回覆，加入父留言的replies陣列
        const parentMessage = messageMap[message.reply_to];
        if (parentMessage) {
          parentMessage.replies.push(messageMap[message.f_message_id]);
        }
      } else {
        // 如果是主留言，加入根留言陣列
        rootMessages.push(messageMap[message.f_message_id]);
      }
    });

    return rootMessages;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3005/fundraiser/message");
        const data = await response.json();
        
        // 假設 API 返回的數據需要添加 reply_to 欄位來表示回覆關係
        const processedData = data.rows.map(message => {
          // 根據 f_message_id 判斷是否為回覆
          // 假設 id 為 1 的是主留言，2和3是對1的回覆
          if (message.f_message_id === 2 ) {
            return { ...message, reply_to: 1 };
          }
          return message;
        });

        const treeStructure = buildMessageTree(processedData);
        setMessages(treeStructure);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const Message = ({ message, isReply = false }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className={`${styles.messageCard} ${isReply ? styles.replyCard : ''}`}>
        <div className={styles.messageContent}>
          <div className={styles.avatar}>
            {message.f_member_id === 2 ? '客服' : `用戶`}
          </div>
          <div className={styles.mainContent}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {message.f_member_id === 2 ? (
                  <span className={styles.customerService}>【客服回覆】</span>
                ) : (
                  `用戶 ${message.f_member_id}`
                )}
              </span>
              <span className={styles.messageTime}>
                {new Date(message.f_message_current).toLocaleString()}
              </span>
            </div>
            <div className={styles.messageBody}>
              <h4 className={styles.messageTitle}>{message.f_message_title}</h4>
              <p className={styles.messageText}>{message.f_message_content}</p>
            </div>
          </div>
        </div>

        {message.replies && message.replies.length > 0 && (
          <div className={styles.toggleReplies}>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.toggleButton}
            >
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
              {message.replies.length} 則回覆
            </button>
          </div>
        )}

        {isExpanded && message.replies && message.replies.length > 0 && (
          <div className={styles.repliesContainer}>
            {message.replies.map(reply => (
              <Message 
                key={reply.f_message_id} 
                message={reply} 
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.messageContainer}>
      {messages.map(message => (
        <Message key={message.f_message_id} message={message} />
      ))}
    </div>
  );
};

export default CommentItem;