import React from "react";
import styles from "./login.module.css";
import MemIcons from "@/components/member/mem-icons";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img
          src="/image/img-Jade/user-2.png"
          alt="Profile"
          className={styles.profileImage}
        />
        <h2 className={styles.welcomeText}>Welcome Back!</h2>
        <form>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icon-user-2" size="medium" />
            </span>
            {/* <span className={styles.icon}>👤</span> */}
            <input
              type="text"
              placeholder="Username or Email"
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.icon}>
              <MemIcons iconName="icon-lock" size="medium" />
            </span>

            {/* <span className={styles.icon}>🔒</span> */}
            <input
              type="password"
              placeholder="Password"
              className={styles.inputField}
            />
          </div>
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
    </div>
  );
};

export default Login;
