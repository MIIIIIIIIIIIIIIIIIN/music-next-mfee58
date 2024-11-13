import React, { useState, useEffect } from 'react';
import styles from './ProjectForm.module.css';

// 進度條元件
const ProgressBar = ({ currentStep }) => {
  return (
    <div className={styles.progressBar}>
      <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
        建立專案
      </div>
      <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
        專案審查
      </div>
      <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
        專案完成
      </div>
    </div>
  );
};

// 審查進度元件
const ReviewProgress = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 1000); // 等待動畫完成後回調
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewContent}>
        {progress < 100 ? (
          <>
            <div className={styles.loadingIcon}>
              <svg className={styles.spinner} viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
              </svg>
            </div>
            <h2 className={styles.reviewTitle}>審查中...</h2>
          </>
        ) : (
          <div className={styles.successAnimation}>
            <div className={styles.checkmark}>
              <svg className={styles.checkmarkIcon} viewBox="0 0 52 52">
                <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <h2 className={styles.reviewTitle}>審查完成！</h2>
          </div>
        )}
        <div className={styles.reviewProgressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// 專案表單元件
const ProjectForm = ({ onBack, onSubmit, currentStep }) => {
  const [formData, setFormData] = useState({
    f_project_name: '',
    f_tag: '',
    f_project_amount: '',
    f_project_title: '',
    f_project_content: '',
    f_project_picture: null,
    top: null
  });
  const [videoPreview, setVideoPreview] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));

      if (name === 'f_project_picture') {
        setVideoPreview(URL.createObjectURL(files[0]));
      } else if (name === 'top') {
        setImagePreview(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          ← 返回
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="f_project_name">專案名稱 *</label>
          <input
            type="text"
            id="f_project_name"
            name="f_project_name"
            value={formData.f_project_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_tag">專案類型 *</label>
          <select
            id="f_tag"
            name="f_tag"
            value={formData.f_tag}
            onChange={handleInputChange}
            required
          >
            <option value="">請選擇類型</option>
            <option value="Pop">Pop</option>
            <option value="Soul">Soul</option>
            <option value="Blue">Blue</option>
            <option value="Rock">Rock</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_amount">募資金額 *</label>
          <input
            type="number"
            id="f_project_amount"
            name="f_project_amount"
            value={formData.f_project_amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_title">專案標題 *</label>
          <input
            type="text"
            id="f_project_title"
            name="f_project_title"
            value={formData.f_project_title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="f_project_content">專案內容 *</label>
          <textarea
            id="f_project_content"
            name="f_project_content"
            value={formData.f_project_content}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.uploadSection}>
          <div className={styles.formGroup}>
            <label htmlFor="f_project_picture">專案影片 *</label>
            <input
              type="file"
              id="f_project_picture"
              name="f_project_picture"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
            {videoPreview && (
              <div className={styles.videoPreview}>
                <video 
                  controls 
                  src={videoPreview}
                  className={styles.previewVideo}
                >
                  您的瀏覽器不支持影片播放。
                </video>
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="top">封面圖片 *</label>
            <input
              type="file"
              id="top"
              name="top"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {imagePreview && (
              <div className={styles.imagePreview}>
                <img 
                  src={imagePreview} 
                  alt="封面預覽"
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            提交專案
          </button>
        </div>
      </form>
    </div>
  );
};

// 成功頁面元件
const SuccessPage = ({ onReturn }) => {
  return (
    <div className={styles.container}>
      <div className={styles.successPage}>
        <div className={styles.successContent}>
          <h1>專案建立成功！</h1>
          <p>您的專案已經成功建立並通過審核</p>
          <button onClick={onReturn} className={styles.returnButton}>
            返回首頁
          </button>
        </div>
      </div>
    </div>
  );
};

// 主視圖元件
const MainView = ({ onCreateProject }) => {
  return (
    <div className={styles.mainView}>
      <h1>專案列表</h1>
      <button onClick={onCreateProject} className={styles.createButton}>
        創建新專案
      </button>
    </div>
  );
};

// 主要系統元件
const ProjectSystem = () => {
  const [currentView, setCurrentView] = useState('main');
  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = (formData) => {
    setCurrentStep(2); // 更新進度條狀態為審查中
    setCurrentView('review');
  };

  const handleReviewComplete = () => {
    setCurrentStep(3); // 更新進度條狀態為完成
    setTimeout(() => {
      setCurrentView('success');
    }, 1000); // 等待一秒後切換到成功頁面
  };

  const handleReturnToMain = () => {
    setCurrentStep(1);
    setCurrentView('main');
  };

  return (
    <div className={styles.systemContainer}>
      {/* 在所有視圖中都顯示進度條，除了主視圖 */}
      {currentView !== 'main' && <ProgressBar currentStep={currentStep} />}

      {currentView === 'main' && (
        <MainView 
          onCreateProject={() => {
            setCurrentStep(1);
            setCurrentView('form');
          }} 
        />
      )}
      
      {currentView === 'form' && (
        <ProjectForm 
          onBack={handleReturnToMain}
          onSubmit={handleFormSubmit}
          currentStep={currentStep}
        />
      )}
      
      {currentView === 'review' && (
        <ReviewProgress onComplete={handleReviewComplete} />
      )}
      
      {currentView === 'success' && (
        <SuccessPage onReturn={handleReturnToMain} />
      )}
    </div>
  );
};

export default ProjectSystem;