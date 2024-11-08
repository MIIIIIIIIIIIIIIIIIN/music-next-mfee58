import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import styles from "@/components/stream/chat/ws-client.module.css";

const ChatRoom = () => {
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messageAreaRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://192.168.37.184:3500", {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log(
          "Connected to server with socket ID:",
          socketRef.current.id
        );
      });

      socketRef.current.on("message_history", (history) => {
        setMessages(history);
      });

      socketRef.current.on("receive_message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      const id = `${socketRef.current.id}-${Date.now()}`;
      setUserId(id);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLogin = () => {
    if (nickname.trim() && socketRef.current) {
      setIsLoggedIn(true);
      socketRef.current.emit("user_join", {
        userId,
        nickname,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      const messageData = {
        userId,
        nickname,
        text: message,
        timestamp: new Date().toISOString(),
      };
      socketRef.current.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div style={{ verticalAlign: "top", marginTop: "3rem" }}>
      <div className={styles.container}>
        {!isLoggedIn ? (
          <div className={styles.loginContainer}>
            <input
              type="text"
              placeholder="請問怎麼稱呼"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={styles.loginInput}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button onClick={handleLogin} className={styles.loginButton}>
              加入聊天室
            </button>
          </div>
        ) : (
          <div className={styles.chatContainer}>
            <div className={styles.header}>聊天室</div>
            <div ref={messageAreaRef} className={styles.messageArea}>
              {messages.map((msg, index) => (
                <div key={`${msg.userId || "system"}-${index}`}>
                  {msg.type === "system" ? (
                    <div className={styles.systemMessage}>{msg.text}</div>
                  ) : (
                    <div className={styles.messageRow}>
                      <div className={styles.username}>
                        {msg.userId === userId ? "You" : msg.nickname}
                      </div>
                      <div className={styles.message}>{msg.text}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="輸入聊天訊息"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className={styles.input}
              />
              <button onClick={sendMessage} className={styles.sendButton}>
                送出
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
