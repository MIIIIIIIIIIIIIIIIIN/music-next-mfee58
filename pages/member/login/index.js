import React, { useState } from "react";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";
import { useAuth } from "@/Context/auth-context";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useAuth(); // 從 AuthContext 中取出 login 方法
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 通用的登入函數
  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    const { success, id, account } = await login(email, password);

    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        // 使用 account 作為跳轉的 URL 參數
        window.location.href = `/member/blog/${account}`;
      }, 2000);
    } else {
      setErrorMessage("登入失敗");
    }
  };

  // 快速登入功能
  const quickLogin = async () => {
    setEmail("test001");
    setPassword("tt001");
    const { success, id } = await login("test001", "tt001");

    if (success) {
      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = `/member/blog/${id}`;
      }, 2000);
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
              <MemIcons
                iconName={showPassword ? "icons-eye-off" : "icons-eye"}
                size="medium"
              />
            </span>
          </div>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          <button type="submit" className={styles.loginButton}>
            登入
          </button>
        </form>

        <div className={styles.links}>
          <p
            onClick={() => router.push("/register")}
            className={styles.createAccount}
            style={{ cursor: "pointer" }}
          >
            建立帳號
          </p>
          <br />
          <div
            onClick={() => router.push("/")}
            className={styles.createAccount}
            style={{ cursor: "pointer" }}
          >
            <MemIcons iconName="icons-home" size="medium" />
          </div>
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
            <p>登入成功! 歡迎回來!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
