import React, { useState } from "react";
import styles from "./password-input.module.css";

const PasswordInput = ({size="medium", placeholder="請輸入文字", isEmail=false}) => {
  const [text, setText] = useState(""); // 管理輸入框的文字
  const [isPasswordMode, setIsPasswordMode] = useState(true); // 管理是否顯示為密碼模式
  const [isValid, setIsValid]=useState(true); // 管理輸入內容是否有效


  // 當用戶修改輸入框時更新文字
  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);


    if (isEmail){
      setIsValid(value.includes("@"));
    }else{
     setIsValid(true); 
    }
  };

  // 控制是否顯示為密碼模式
  const togglePasswordMode = () => {
    setIsPasswordMode(!isPasswordMode); // 切換密碼顯示模式
  };



  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.inputContainer}>
        {/* 顯示輸入框 */}
        <input
          type={isPasswordMode ? "password" : "text"} // 根據狀態設置 input 顯示為密碼或普通文本
          className={`${styles.input} ${styles[size]}`}
          value={text}
          onChange={handleInputChange}
          placeholder={placeholder}
        />

        {/* 眼睛圖標按鈕，用於切換顯示模式 */}
        <button className={`${styles.toggleButton} ${styles[size]}`}
        onClick={togglePasswordMode}
        >
          <img
            src={isPasswordMode ? "/icons/eye-open.svg" : "/icons/eye-close.svg"} // 正確引用路徑
            alt="Toggle Visibility"
            className={`${styles.icon} ${styles[size]}`}
          />
        </button>
      </div>
      {!isValid && (
        <div className={styles.errorText}>
          請輸入有效的信箱
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
