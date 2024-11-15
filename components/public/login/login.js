import React, { useState } from "react";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";
import { useAuth } from "@/Context/auth-context";

const Login = () => {
  const { login } = useAuth(); // 從 AuthContext 中取出 login 方法
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 通用的登入函數
  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    const success = await login(email, password);

    if (success) {
        // console.log("Login successful:", auth); // 檢查 auth 中是否有 token
      setShowSuccess(true); // 登入成功時顯示提示框
      setTimeout(() => {
        window.location.href = "/member-blog/";
      }, 2000); // 延遲兩秒後跳轉頁面
    } else {
      setErrorMessage("登入失敗");
    }
  };

  // 快速登入的功能，使用測試帳號和密碼
  const quickLogin = async () => {
    setEmail("test001");
    setPassword("tt001");
    const success = await login("test001", "tt001");

    if (success) {
      setShowSuccess(true); // 快速登入成功時顯示提示框
      setTimeout(() => {
        window.location.href = "/member-blog";
      }, 2000); // 延遲兩秒後跳轉頁面
    } else {
      setErrorMessage("快速登入失敗");
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

        {/* 快速登入按鈕 */}
        <button onClick={quickLogin} className={styles.quickLoginButton}>
          快速登入
        </button>
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
