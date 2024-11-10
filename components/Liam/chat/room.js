// 自動回覆邏輯
export const getAutoResponse = (message) => {
  const responses = {
    // 一般問候
    '你好': '您好！很高興為您服務，請問有什麼需要協助的嗎？',
    '在嗎': '您好！我在的，很抱歉讓您久等了，請問需要什麼協助？',
    '謝謝': '不客氣！很高興能幫助到您。如果還有任何問題，隨時都可以詢問。',
    
    // 商品相關
    '價格': '您想詢問哪項商品的價格呢？請提供商品名稱，我會立即為您查詢。',
    '庫存': '需要為您查詢哪個商品的庫存狀況呢？',
    '折扣': '目前店內正在進行春季特賣活動，全館商品8折起！使用優惠碼「SPRING2024」還可以享有額外95折優惠。',
    
    // 運送相關
    '運費': '我們提供以下運送方式：\n1. 一般宅配：滿1000元免運費\n2. 超商取貨：60元\n3. 超商取貨付款：65元',
    '配送': '一般訂單我們會在1-3個工作天內寄出，寄出後會立即提供追蹤碼給您。',
    '寄送': '請問您希望使用哪種寄送方式呢？我們提供宅配和超商取貨兩種選擇。',
    
    // 售後服務
    '退換貨': '本店提供7天鑑賞期，商品如有問題，請保持商品完整性，並拍照記錄，我們會協助您處理退換貨事宜。',
    '保固': '我們所有商品都提供原廠保固，保固期限依商品類型而定，通常為1-2年不等。',
    '維修': '如果商品需要維修，請提供：\n1. 購買證明\n2. 商品序號\n3. 問題描述\n我們會協助您安排維修服務。',
    
    // 預設回覆
    default: '感謝您的詢問！我們會盡快為您處理。請問還有什麼需要協助的嗎？'
  };

  // 檢查訊息是否匹配任何關鍵字
  for (const [keyword, response] of Object.entries(responses)) {
    if (message.toLowerCase().includes(keyword)) {
      return response;
    }
  }
  
  return responses.default;
};

// 格式化時間
export const formatTime = (date) => {
  return new Intl.DateTimeFormat('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
};

// 生成訊息ID
export const generateMessageId = () => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 建立新訊息物件
export const createMessage = (content, sender, status = 'sent') => {
  return {
    id: generateMessageId(),
    content,
    sender,
    status,
    timestamp: formatTime(new Date()),
    createdAt: new Date()
  };
};