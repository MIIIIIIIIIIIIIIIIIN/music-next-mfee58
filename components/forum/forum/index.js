// components/forum/index.js
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { Clock, Flame, Flag } from "lucide-react";
import styles from "./forum.module.css";
import Heart from "@/components/public/hearts";
import ShareIcon from "@/components/public/icons/share_icon";

// SortingButton Component
const SortingButton = ({ active, onClick, children }) => (
  <button
    className={`${styles.sortingButton} ${active ? styles.active : ""}`}
    onClick={onClick}
  >
    <span className={styles.sortingButtonText}>{children}</span>
    {active && <span className={styles.sortingIndicator} />}
  </button>
);

// ForumPost Component
const ForumPost = ({
  userImage,
  username,
  title,
  content,
  coverImage,
  likes: initialLikes,
  reposts,
  timeStamp,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const formatTimeStamp = (mysqlTimestamp) => {
    const date = new Date(mysqlTimestamp.replace(" ", "T"));
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.userSection}>
        <img src={userImage} alt={username} className={styles.userImage} />
        <div className={styles.userInfo}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.timestamp}>{formatTimeStamp(timeStamp)}</div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.textContent}>
          <p className={styles.text}>{content}</p>
          <div className={styles.interactionButtons}>
            <button 
              className={`${styles.button} ${isLiked ? styles.liked : ''}`}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? "#ef4444" : "none"} />
              <span className={styles.buttonCount}>{likes}</span>
            </button>
            <button className={styles.button}>
              <ShareIcon size={18} />
              <span className={styles.buttonCount}>{reposts}</span>
            </button>
            <button className={styles.button}>
              <Flag size={18} />
            </button>
          </div>
        </div>
        <img src={coverImage} alt="Cover" className={styles.coverImage} />
      </div>
    </div>
  );
};

// Placeholder Data
const placeholderPosts = [
  {
    id: 1,
    userImage: "/s_img/forum.jpg",
    username: "MusicLover",
    title: "探索音樂的深層意義",
    content:
      "音樂是一種無形的語言，它能觸動人心最深處的情感。在寂靜的夜晚，一首優美的旋律可以帶來無限的慰藉。音樂不僅僅是聲音的組合，更是靈魂的共鳴。每個音符都訴說著不同的故事，每個節奏都傳達著獨特的情感。",
    coverImage: "/s_img/forum-album.jpg",
    likes: 542,
    reposts: 89,
    timeStamp: "2024-11-10 15:30:00",
  },
  {
    id: 2,
    userImage: "/s_img/forum1.jpg",
    username: "PhilosophySeeker",
    title: "生命中的必然與偶然",
    content:
      "人生就像一場旅途，充滿著必然與偶然的相遇。有時候我們精心規劃的道路可能會出現意想不到的轉折，而看似偶然的相遇卻可能改變我們的一生。這種矛盾與平衡，正是生命最迷人的地方。",
    coverImage: "/s_img/forum-album1.jpg",
    likes: 238,
    reposts: 45,
    timeStamp: "2024-11-11 09:15:00",
  },
  {
    id: 3,
    userImage: "/s_img/forum.jpg",
    username: "ArtExplorer",
    title: "藝術的真諦",
    content:
      "藝術不僅是視覺的享受，更是心靈的對話。當我們站在一幅畫作前，我們不只是在觀看，更是在與藝術家進行跨越時空的交流。每個筆觸、每種顏色都承載著創作者的情感與思考。藝術讓我們看見世界的另一面，也讓我們更了解自己。",
    coverImage: "/s_img/forum-album.jpg",
    likes: 876,
    reposts: 156,
    timeStamp: "2024-11-09 18:45:00",
  },
  {
    id: 4,
    userImage: "/s_img/forum.jpg",
    username: "NatureLover",
    title: "大自然的啟示",
    content:
      "在繁忙的都市生活中，我們常常忽略了大自然的智慧。每一片樹葉的脈絡、每一朵花的綻放都蘊含著生命的奧秘。當我們駐足觀察，會發現自然界中存在著最完美的設計。這些啟示不僅能幫助我們更好地理解世界，也能指導我們如何更和諧地生活。",
    coverImage: "/s_img/forum-album.jpg",
    likes: 654,
    reposts: 92,
    timeStamp: "2024-11-11 11:20:00",
  },
];

// Main ForumContainer Component
const ForumContainer = () => {
  const [posts, setPosts] = useState(placeholderPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  const breakpointColumns = {
    default: 2,
    1024: 2,
    768: 1,
  };

  const sortByLatest = () => {
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
    );
    setPosts(sortedPosts);
    setSortBy("latest");
  };

  const sortByPopular = () => {
    const sortedPosts = [...posts].sort((a, b) => b.likes - a.likes);
    setPosts(sortedPosts);
    setSortBy("popular");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/forum/posts?page=${page}&perpage=12`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await response.json();

        if (data.status === "success") {
          setPosts((prevPosts) =>
            page === 1 ? data.data.posts : [...prevPosts, ...data.data.posts]
          );
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading && page === 1) {
    return <div className={styles.loadingText}>Loading posts...</div>;
  }

  if (error) {
    return <div className={styles.errorText}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className="mb-4 flex items-center">
        <SortingButton active={sortBy === "latest"} onClick={sortByLatest}>
          <Clock size={18} />
          最新
        </SortingButton>

        <SortingButton active={sortBy === "popular"} onClick={sortByPopular}>
          <Flame size={18} />
          熱門
        </SortingButton>
      </div>
      {/* <div className={styles.decorativeLine} /> */}

      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {posts.map((post) => (
          <ForumPost key={post.id} {...post} />
        ))}
      </Masonry>

      {!loading && posts.length > 0 && (
        <div className={styles.loadMoreContainer}>
          <button
            className={styles.loadMoreButton}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumContainer;
export { ForumPost, SortingButton };
