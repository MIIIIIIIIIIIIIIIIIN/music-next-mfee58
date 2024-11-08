import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import ForumPost from "../post";
import styles from "@/components/forum/forum-container/forum-cotainer.module.css";

const ForumContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const breakpointColumns = {
    default: 3, // 3 columns for large screens
    1024: 2, // 2 columns for medium screens
    768: 1, // 1 column for mobile
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Using the full URL including port number
        const response = await fetch(
          `http://localhost:3005/api/forum/posts?page=${page}&perpage=12`
        );

        // Log for debugging
        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch posts");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log for debugging

        if (data.status === "success") {
          setPosts((prevPosts) =>
            page === 1 ? data.data.posts : [...prevPosts, ...data.data.posts]
          );
        }
      } catch (err) {
        console.error("Fetch error:", err); // Log for debugging
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
      <Masonry
        breakpointCols={breakpointColumns}
        className={styles.masonryGrid}
        columnClassName={styles.masonryColumn}
      >
        {posts.map((post) => (
          <ForumPost
            key={post.id}
            userImage={post.userImage}
            username={post.username}
            title={post.title}
            content={post.content}
            coverImage={post.coverImage}
            timeStamp={post.timeStamp}
            likes={post.likes}
            reposts={post.reposts}
          />
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
