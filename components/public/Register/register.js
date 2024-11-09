import React, { useState } from 'react';
import axios from 'axios';
import styles from './register.module.css'; // 請在相同資料夾內建立 Register.module.css 檔案，並加入樣式

const Register = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/auth/register', {
        account,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('註冊失敗，請重試');
      }
    }
  };

  return (
    <>
    <div className={styles.background}>
      <div className={styles.container}>
        <img src="/image/img-Jade/aimyon.png" alt="Logo" className={styles.logo} /> {/* 修改此路徑為您的 logo */}
        <h2 className={styles.title}>會員註冊</h2>
        <form onSubmit={handleRegister} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>帳號：</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>密碼：</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>註冊</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
    </>
  );
};

export default Register;
