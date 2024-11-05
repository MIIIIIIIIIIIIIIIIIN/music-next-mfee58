import React, { useState } from 'react';
import styles from './message.module.css';

// 遞迴渲染留言組件
const CommentItem = ({ comment, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`${styles.commentItem} ${level > 0 ? styles.nested : ''}`}>
      <div 
        className={styles.commentContent}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img src={comment.userAvatar || '/default-avatar.png'} alt={comment.userName} />
          </div>
          <span className={styles.userName}>{comment.userName}</span>
          <span className={styles.commentType}>{comment.type}</span>
        </div>
        
        <div className={styles.messageContent}>
          <div className={styles.dateWrapper}>
            <span className={styles.date}>{comment.date}</span>
          </div>
          <p className={styles.commentText}>{comment.content}</p>
        </div>

        {comment.replies?.length > 0 && (
          <div className={styles.replyIndicator}>
            <span className={`${styles.expandArrow} ${isExpanded ? styles.expanded : ''}`}>
              ›
            </span>
            <span>{comment.replies.length} 則回覆</span>
          </div>
        )}
      </div>

      {isExpanded && comment.replies?.length > 0 && (
        <div className={styles.repliesContainer}>
          {comment.replies.map((reply, index) => (
            <CommentItem 
              key={reply.id || index} 
              comment={reply} 
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Message = ({ comments }) => {
  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <CommentItem 
          key={comment.id || index} 
          comment={comment}
        />
      ))}
    </div>
  );
};

export default Message;