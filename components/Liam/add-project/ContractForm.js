import React, { useState, useRef } from 'react';
import styles from './ContractForm.module.css';

const ContractForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    const element = e.target;
    const reachedBottom = Math.abs(
      element.scrollHeight - element.scrollTop - element.clientHeight
    ) < 1;
    
    if (reachedBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAgree = () => {
    setIsAgreed(true);
  };

  const handleSubmit = () => {
    if (isAgreed) {
      console.log('表單已提交');
      // location.href('lo')
    }
  };

  return (
    <div className={styles.container}>
      {!showForm ? (
        <button 
          className={styles.showButton}
          onClick={() => setShowForm(true)}
        >
          {/* <span className={styles.buttonIcon}>📜</span> */}
          (想要募資商品)
        </button>
      ) : (
        <div className={styles.card}>
          <div 
            ref={contentRef}
            onScroll={handleScroll}
            className={styles.content}
          >
            <h2 className={styles.title}>服務條款與合約</h2>
            <div className={styles.terms}>
              <p>一、服務內容</p>
              <p>1.1 本合約旨在規範用戶使用本平台服務時的權利與義務。</p>
              <p>1.2 用戶需要遵守平台的相關規定和政策。</p>
              
              <p>二、用戶責任</p>
              <p>2.1 用戶應確保提供的信息真實準確。</p>
              <p>2.2 用戶應妥善保管帳號密碼。</p>
              
              <p>三、隱私保護</p>
              <p>3.1 平台承諾保護用戶的個人信息安全。</p>
              <p>3.2 未經用戶同意，不會向第三方披露用戶信息。</p>
              
              <p>四、智慧財產權</p>
              <p>4.1 平台上的內容受智慧財產權法保護。</p>
              <p>4.2 未經授權，用戶不得複製或傳播平台內容。</p>
              
              <p>五、免責聲明</p>
              <p>5.1 平台不對用戶間的交易承擔責任。</p>
              <p>5.2 因不可抗力導致的服務中斷，平台不承擔責任。</p>
              
              <p>六、合約終止</p>
              <p>6.1 用戶可隨時終止使用平台服務。</p>
              <p>6.2 如用戶違反合約規定，平台有權終止服務。</p>
            </div>
          </div>
          
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.agreeButton} ${isAgreed ? styles.agreed : ''}`}
              disabled={!hasScrolledToBottom}
              onClick={handleAgree}
            >
              <span className={styles.buttonIcon}>✓</span>
              {isAgreed ? '已同意條款' : '同意條款'}
            </button>
            
            <button
              className={`${styles.button} ${styles.submitButton}`}
              disabled={!isAgreed}
              onClick={handleSubmit}
            >
              創建專案
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractForm;