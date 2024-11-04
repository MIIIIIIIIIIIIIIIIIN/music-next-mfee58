import React from "react";
import Heart from "@/components/public/hearts";
import ShareIcon from "@/components/public/icons/share_icon";
import { Flag } from "lucide-react";

const ForumPost = ({
  userImage = "/api/placeholder/40/40",
  username = "Username",
  title = "P-離別對於愛情",
  content = "P-離別對於愛情，就像風對於火一樣",
  coverImage = "/api/placeholder/120/120",
  likes = 100,
  reposts = 100,
  timeStamp = new Date().toISOString().slice(0, 19).replace("T", " "), // Default MySQL format
}) => {
  const styles = {
    container: {
      width: "calc(50% - 2rem)",
      display: "inline-block",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      padding: "1.5rem",
      margin: "1rem",
      transition: "all 0.2s ease-in-out",
      verticalAlign: "top",
    },
    content: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    userInfo: {
      flex: 1,
    },
    userImage: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      objectFit: "cover",
      marginRight: "1rem",
    },
    contentSection: {
      flexGrow: 1,
      width: "100%",
    },
    title: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "0.25rem",
    },
    timestamp: {
      fontSize: "0.8rem",
      color: "#9CA3AF",
      marginBottom: "0.5rem",
    },
    text: {
      color: "#4B5563",
      marginBottom: "1rem",
      fontSize: "0.95rem",
    },
    mainContent: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1rem",
    },
    textContent: {
      flex: "1",
    },
    coverImage: {
      width: "180px",
      height: "180px",
      borderRadius: "4px",
      objectFit: "cover",
    },
    interactionButtons: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#6B7280",
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "0.25rem",
    },
    buttonCount: {
      fontSize: "0.9rem",
      color: "#9CA3AF",
    },
  };

  const formatTimeStamp = (mysqlTimestamp) => {
    const date = new Date(mysqlTimestamp.replace(" ", "T")); // Convert MySQL timestamp to JS Date
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    // For very recent posts (less than 1 minute)
    if (seconds < 60) {
      return "Just now";
    }
    // For posts less than 1 hour old
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    // For posts less than 24 hours old
    if (hours < 24) {
      return `${hours}h ago`;
    }
    // For posts less than 30 days old
    if (days < 30) {
      return `${days}d ago`;
    }
    // For older posts, show the actual date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const hoverEffect = (e) => {
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  };

  const removeHoverEffect = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
  };

  return (
    <div
      style={styles.container}
      onMouseEnter={hoverEffect}
      onMouseLeave={removeHoverEffect}
    >
      <div style={styles.userSection}>
        <img src={userImage} alt={username} style={styles.userImage} />
        <div style={styles.userInfo}>
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.timestamp}>{formatTimeStamp(timeStamp)}</div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.textContent}>
          <p style={styles.text}>{content}</p>
          <div style={styles.interactionButtons}>
            <button style={styles.button}>
              <Heart size={20} />
              <span style={styles.buttonCount}>{likes}</span>
            </button>
            <button style={styles.button}>
              <ShareIcon size={20} />
              <span style={styles.buttonCount}>{reposts}</span>
            </button>
            <button style={styles.button}>
              <Flag size={20} />
            </button>
          </div>
        </div>
        <img src={coverImage} alt="Cover" style={styles.coverImage} />
      </div>
    </div>
  );
};

export default ForumPost;
