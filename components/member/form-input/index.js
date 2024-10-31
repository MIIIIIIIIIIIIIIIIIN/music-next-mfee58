import React, { useState } from "react";
import styles from "./form-inputM.module.css";

const FormInputM = ({ size = "medium", value, onChange, isEmail = false }) => {
  const [isValid, setIsValid] = useState(true); // 驗證狀態
  const sizeClass =
    size === "small"
      ? styles.small
      : size === "large"
      ? styles.large
      : styles.medium;

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // 如果是信箱格式，檢查是否符合格式
    if (isEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailPattern.test(inputValue));
    }

    // 將值傳遞回父元件
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={`${styles.input} ${sizeClass} ${isEmail && !isValid ? styles.invalid : ""}`}
        value={value}
        onChange={handleChange}
        placeholder={isEmail ? "請輸入有效的信箱" : ""}
      />
      {/* 錯誤訊息 */}
      {isEmail && !isValid && (
        <div className={styles.errorText}>請輸入有效的信箱地址</div>
      )}
    </div>
  );
};

export default FormInputM;
