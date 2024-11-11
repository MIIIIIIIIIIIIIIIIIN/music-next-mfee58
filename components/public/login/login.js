import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/member/login", {
        email,
        password,
      });

      if (response.data.success) {
        setShowSuccess(true); // 登入成功時顯示提示框
        setTimeout(() => {
          window.location.href = "/member-blog";
        }, 2000); // 延遲兩秒後跳轉頁面
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img
          src="/image/img-mem/user-logo000.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <h2 className={styles.welcomeText}>歡迎回來</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icon-user" size="medium" />
            </span>
            <input
              type="text"
              placeholder="帳號或信箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icons-lock-2" size="medium" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              <MemIcons iconName={showPassword ? "icons-eye-off" : "icons-eye"} size="medium" />
            </span>
          </div>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          <button type="submit" className={styles.loginButton}>
            登入
          </button>
        </form>
        <div className={styles.links}>
          <a href="./register" className={styles.createAccount}>
            建立帳號
          </a>
          <br />
          <a href="/" className={styles.createAccount}>
            <MemIcons iconName="icons-home" size="medium" />
          </a>
        </div>
      </div>

      {/* 自訂成功提示框 */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <p>登入成功!歡迎回來!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
