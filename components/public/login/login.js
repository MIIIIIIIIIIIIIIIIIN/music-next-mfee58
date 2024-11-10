import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";
import LoginStatusChecker from "../LoginStatusChecker";

axios.defaults.withCredentials = true; // 全局攜帶 cookie

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3005/login", {
        email,
        password,
      });

      if (response.data.success) {
        alert("登入成功! 歡迎回來!");
        window.location.href = "/member-blog";
      } else {
        setErrorMessage(response.data.error);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login.");
      console.error("Login error:", error);
    }
  };

  return (
    <>

    <div className={styles.container}>
      {/* <div>
        <h1>Welcome to the App</h1>
        <LoginStatusChecker />
      </div> */}
      <div className={styles.loginBox}>
        <img
          src="/image/img-mem/user-logo000.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        <h2 className={styles.welcomeText}>歡迎回來!</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icon-user-2" size="medium" />
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
              <MemIcons iconName="icon-lock" size="medium" />
            </span>
            <input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          <button type="submit" className={styles.loginButton}>
            登入
          </button>
        </form>
        <div className={styles.links}>
          {/* <a href="#" className={styles.forgotPassword}>
            Forgot Username or Password?
          </a> */}
          <a href="./register" className={styles.createAccount}>
            建立帳號{" "}
          </a>
          <br />

          <a href="/" className={styles.createAccount}>
          <MemIcons iconName="icons-home" size="medium" />


          </a>
        </div>
      </div>
      {/* <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickname");
        localStorage.removeItem("account");
        window.location.href='/';
      }} >登出</button> */}
    </div></>
  );
};

export default Login;
