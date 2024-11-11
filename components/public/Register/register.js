import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./register.module.css";
import MemIcons from "@/components/member/mem-icons";

const Register = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // 控制成功提示框顯示
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 驗證帳號長度
    if (account.length < 6) {
      setAccountError("帳號需至少6碼");
      return;
    } else {
      setAccountError("");
    }

    // 驗證信箱格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("請輸入有效的信箱格式");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post("http://localhost:3005/member/register", {
        account,
        password,
        email,
      });

      if (response.data.message === "註冊成功") {
        setShowSuccess(true); // 顯示成功提示框
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/login");
        }, 5000); // 5秒後跳轉頁面
      } else {
        // 顯示錯誤訊息
        if (response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError(""); // 清除信箱錯誤
        } else if (response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError(""); // 清除帳號錯誤
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // 根據後端錯誤訊息顯示相應的錯誤提示
        if (error.response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError(""); // 清除信箱錯誤
        } else if (error.response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError(""); // 清除帳號錯誤
        } else {
          setAccountError("");
          setEmailError("");
          setMessage("註冊失敗，請重試");
        }
      } else {
        setMessage("註冊失敗，請重試");
      }
    }
  };

  // 即時驗證帳號
  const handleAccountChange = (e) => {
    const value = e.target.value;
    setAccount(value);
    if (value.length < 6) {
      setAccountError("帳號需至少6碼");
    } else {
      setAccountError("");
    }
  };

  // 即時驗證信箱
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("請輸入有效的信箱格式");
    } else {
      setEmailError("");
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <img
            src="/image/img-mem/user-logo000.jpg"
            alt="Logo"
            className={styles.logo}
          />
          <h2 className={styles.title}>會員註冊</h2>
          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-user" size="medium" />
              <input
                type="text"
                placeholder="帳號 (至少6碼)"
                value={account}
                onChange={handleAccountChange}
                className={styles.input}
                required
              />
            </div>
            {accountError && <p className={styles.error}>{accountError}</p>}

            <div className={styles.inputGroup}>
              <MemIcons iconName="icons-lock-2" size="medium" />
              <input
                type="password"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-mail" size="medium" />
              <input
                type="email"
                placeholder="信箱"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                required
              />
            </div>
            {emailError && <p className={styles.error}>{emailError}</p>}

            <button type="submit" className={styles.button}>
              註冊
            </button>
            <br />
            <a href="/" className={styles.createAccount}>
              <MemIcons iconName="icons-home" size="medium" />
            </a>
          </form>
        </div>
      </div>

      {/* 註冊成功提示框 */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successMessage}>
            <p>註冊成功!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
