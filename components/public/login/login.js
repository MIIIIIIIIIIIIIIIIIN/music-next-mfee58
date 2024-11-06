import React, { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log('email',email);
    // console.log('password',password);
    
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      // console.log("Login response:", response.data);
      
      if (response.data.success) {
        
        const { token, id, nickname,account } = response.data.bodyData;
        localStorage.setItem("token", token); // Store token for authentication
        localStorage.setItem("userId", id);
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("account", account);
        alert("Login successful!");
        // Redirect or update the UI as needed
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
          src="/image/img-Jade/user-2.png"
          alt="Profile"
          className={styles.profileImage}
        />
        <h2 className={styles.welcomeText}>Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icon-user-2" size="medium" />
            </span>
            <input
              type="text"
              placeholder="Username or Email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
          <button type="submit" className={styles.loginButton}>
            LOGIN
          </button>
        </form>
        <div className={styles.links}>
          <a href="#" className={styles.forgotPassword}>
            Forgot Username or Password?
          </a>
          <a href="#" className={styles.createAccount}>
            Create new account
          </a>
        </div>
      </div>
      <button onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("nickname");
        localStorage.removeItem("account");
        window.location.href='/';
      }} >登出</button>
    </div>
  );
};

export default Login;
