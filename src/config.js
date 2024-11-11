// src/utils/config.js
// src/utils/config.js
export const SOCKET_URL = 'http://localhost:3007';
export const API_URL = 'http://localhost:3007/api';

// 明確定義自動登入設定
export const AUTO_LOGIN = {
  enabled: true,  // 是否啟用自動登入
  credentials: {
    email: 'ming@test.com',
    password: '123456'
  }
};