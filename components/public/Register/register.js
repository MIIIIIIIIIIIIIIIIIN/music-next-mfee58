import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>會員註冊</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>帳號：</label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密碼：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
