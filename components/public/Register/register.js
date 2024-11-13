import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./register.module.css";
import MemIcons from "@/components/member/mem-icons";

const Register = () => {
  const [nickname, setNickname] = useState("");
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState(""); // 更新 location 狀態
  const [accountError, setAccountError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (account.length < 6) {
      setAccountError("帳號需至少6碼");
      return;
    } else {
      setAccountError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("請輸入有效的信箱格式");
      return;
    } else {
      setEmailError("");
    }

    try {
      const response = await axios.post(
        "http://localhost:3005/member/register",
        {
          account,
          password,
          email,
          nickname,
          location, // 傳送所在地
        }
      );

      if (response.data.message === "註冊成功") {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          router.push("/member-blog");
        }, 5000);
      } else {
        if (response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError("");
        } else if (response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError("");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        if (error.response.data.message === "該帳號已被註冊") {
          setAccountError("此帳號已被註冊");
          setEmailError("");
        } else if (error.response.data.message === "該信箱已被註冊") {
          setEmailError("此信箱已被註冊");
          setAccountError("");
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

  const handleAccountChange = (e) => {
    const value = e.target.value;
    setAccount(value);
    if (value.length < 6) {
      setAccountError("帳號需至少6碼");
    } else {
      setAccountError("");
    }
  };

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
                placeholder="暱稱(之後可做修改)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={styles.input}
                required
              />
            </div>
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
            <div className={styles.inputGroup}>
              <MemIcons iconName="icon-user" size="medium" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                required
              >
                <option value="">選擇所在地</option>
                <option value="北部">北部</option>
                <option value="中部">中部</option>
                <option value="南部">南部</option>
                <option value="東部">東部</option>
                <option value="離島">離島</option>
              </select>
            </div>

            <button type="submit" className={styles.button}>
              註冊
            </button>
            <br />

            <br />
            <a href="/login">
              <p>已有帳號? 前往登入</p>
            </a>
            <br />
            <a href="/" className={styles.createAccount}>
              <MemIcons iconName="icons-home" size="medium" />
            </a>
          </form>
        </div>
      </div>

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
