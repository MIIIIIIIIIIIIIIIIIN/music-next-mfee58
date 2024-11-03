import React, { useState } from 'react';
import { CiChat1 } from "react-icons/ci";
import styles from './contact-Icon.module.css';

const CommentModal = ({ authorInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交留言:', comment);
    setComment('');
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.iconWrapper}>
        <CiChat1 
          className={styles.chatIcon} 
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {/* 作者資訊區 */}
            <div className={styles.authorSection}>
              <div className={styles.authorInfo}>
                <img 
                  src={authorInfo?.avatar || '/01.JPG'} 
                  alt="作者頭像"
                  className={styles.authorAvatar}
                />
                <div className={styles.authorDetails}>
                  <h3 className={styles.authorName}>{authorInfo?.name || 'aaaaaa'}</h3>
                  <span className={styles.authorTitle}>{authorInfo?.title || '職稱'}</span>
                </div>
              </div>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            {/* 留言輸入區 */}
            <form onSubmit={handleSubmit} className={styles.commentForm}>
              <textarea
                className={styles.commentInput}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="請輸入您的留言..."
                rows={6}
                required
              />
              
              {/* 送出按鈕 */}
              <button type="submit" className={styles.submitButton}>
                送出留言
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentModal;