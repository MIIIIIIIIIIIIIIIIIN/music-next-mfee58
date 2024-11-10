import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./register.module.css";
import MemIcons from "@/components/member/mem-icons";

const Register = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // 狀態來控制密碼可見性

  const handleRegister = async (e) => {
    e.preventDefault();

    // 驗證帳號長度是否至少6碼
    if (account.length < 6) {
      setAccountError("帳號需至少6碼");
      return;
    } else {
      setAccountError("");
    }

    // 驗證信箱格式是否包含 @ 和 .
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("請輸入有效的信箱格式");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post("http://localhost:3005/auth/register", {
        account,
        password,
        email,
      });
      setMessage(response.data.message);

      if (response.data.message === "註冊成功") {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
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
                type={showPassword ? "text" : "password"} // 動態設置 input 類型
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)} // 點擊切換 showPassword 狀態
              >
                <MemIcons iconName={showPassword ? "icons-eye-off" : "icons-eye"} size="medium" />
              </span>
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
            <br />

            <button type="submit" className={styles.button}>
              註冊
            </button>
            <br />
            <a href="/" className={styles.createAccount}>
              <MemIcons iconName="icons-home" size="medium" />
            </a>
          </form>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;
