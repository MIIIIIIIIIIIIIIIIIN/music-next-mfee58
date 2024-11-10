'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Store, Check, CheckCheck, Clock, X, Loader, MessageCircle } from 'lucide-react';
import styles from './chat.module.css';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initialMessage = {
      id: 1,
      sender: 'store',
      content: '您好！很高興為您服務，請問有什麼需要協助的嗎？',
      time: new Date().toLocaleTimeString('zh-TW', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'read'
    };
    setMessages([initialMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAutoResponse = (msg) => {
    const responses = {
      '你好': '您好！需要什麼協助嗎？',
      '在嗎': '您好！我在的，請問需要什麼幫助？',
      '價格': '您想詢問哪項商品的價格呢？',
      '運費': '我們提供以下運送方式：\n1. 一般宅配：滿1000元免運費\n2. 超商取貨：60元\n3. 超商取貨付款：65元',
      '配送': '一般訂單我們會在1-3個工作天內寄出。',
      '退換貨': '本店提供7天鑑賞期，收到商品如有問題可以聯繫我們。'
    };

    for (const [keyword, response] of Object.entries(responses)) {
      if (msg.toLowerCase().includes(keyword)) {
        return response;
      }
    }
    return '感謝您的詢問！我們會盡快為您處理。請問還有什麼需要協助的嗎？';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: newMessage,
      time: getCurrentTime(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? {...msg, status: 'read'} : msg
        )
      );

      const storeResponse = {
        id: Date.now() + 1,
        sender: 'store',
        content: getAutoResponse(newMessage),
        time: getCurrentTime(),
        status: 'read'
      };

      setIsTyping(false);
      setMessages(prev => [...prev, storeResponse]);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className={styles.fixedContainer}>
      <div className={`${styles.container} ${!isOpen ? styles.containerHidden : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Store className={styles.storeIcon} />
            <div>
              <h1 className={styles.headerTitle}>客服聊天室</h1>
              <div className={styles.statusContainer}>
                <div className={styles.statusDot} />
                <span className={styles.statusText}>
                  {isTyping ? '正在輸入...' : '在線'}
                </span>
              </div>
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="關閉聊天"
          >
            <X size={16} />
          </button>
        </div>

        <div className={styles.messagesArea}>
          {messages.map((message) => (
            <div key={message.id} 
                 className={`${styles.messageRow} ${
                   message.sender === 'user' ? styles.messageRowUser : ''
                 }`}>
              <div className={styles.avatar}>
                {message.sender === 'user' ? 
                  <User className={styles.avatarIcon} /> : 
                  <Store className={styles.avatarIcon} />
                }
              </div>
              <div className={`${styles.messageBubble} ${
                message.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleStore
              }`}>
                <p className={styles.messageText}>{message.content}</p>
                <div className={styles.messageTime}>
                  <Clock className={styles.timeIcon} />
                  <span>{message.time}</span>
                  {message.sender === 'user' && (
                    message.status === 'read' 
                      ? <CheckCheck className={styles.statusIcon} />
                      : <Check className={styles.statusIcon} />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <form onSubmit={handleSendMessage} className={styles.inputForm}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入訊息..."
              className={styles.textInput}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || isSending}
              className={`${styles.sendButton} ${isSending ? styles.loading : ''}`}
              aria-label="發送訊息"
            >
              <Send className={styles.sendButtonIcon} />
              <Loader className={`${styles.sendButtonLoading} animate-spin`} />
            </button>
          </form>
        </div>
      </div>

      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(true)}
        aria-label="開啟聊天"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatRoom;