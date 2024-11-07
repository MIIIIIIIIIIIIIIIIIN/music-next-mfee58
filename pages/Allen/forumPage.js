import React, { useState } from "react";
import ForumPost from "@/components/forum/post";
import NavBar from "@/components/public/nav";
import SortingButton from "@/components/forum/sorting-button";
import { Clock, Flame } from "lucide-react";
import MagnifyingGlass from "@/components/public/icons/magnifying_glass";

export default function Forum() {
  const [posts, setPosts] = useState([
    {
      userImage: "/s_img/forum.jpg",
      username: "User123",
      title: "P-離別對於愛情",
      content: "P-離別對於愛情，就像風對於火一樣",
      coverImage: "/s_img/forum-album.jpg",
      likes: 236,
      reposts: 100,
      timeStamp: "2024-11-03 14:30:00",
    },
    {
      userImage: "/s_img/forum1.jpg",
      username: "User123",
      title: "雨果講過一段耐人尋思的話，人生是花，而愛便是花的蜜。",
      content:
        "音樂可以說是有著成為常識的趨勢。若沒有音樂的存在，那麼後果可想而知。每個人的一生中，幾乎可說碰到音樂這件事，是必然會發生的。",
      coverImage: "/s_img/forum-album1.jpg",
      likes: 1,
      reposts: 1,
      timeStamp: "2024-11-02 10:30:00",
    },
    {
      userImage: "/s_img/forum.jpg",
      username: "User123",
      title: "P-離別對於愛情",
      content: "P-離別對於愛情，就像風對於火一樣",
      coverImage: "/s_img/forum-album.jpg",
      likes: 50,
      reposts: 50,
      timeStamp: "2024-11-01 14:30:00",
    },
    {
      userImage: "/s_img/forum.jpg",
      username: "User123",
      title: "P-離別對於愛情",
      content: "P-離別對於愛情，就像風對於火一樣",
      coverImage: "/s_img/forum-album.jpg",
      likes: 100,
      reposts: 100,
      timeStamp: "2024-11-02 14:30:00",
    },
  ]);

  const [sortBy, setSortBy] = useState("latest");

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

  const styles = {
    container: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "1rem",
    },
    header: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      padding: "0 1rem",
    },
    searchContainer: {
      marginLeft: "auto",
    },
    searchButton: {
      padding: "0.5rem",
      borderRadius: "50%",
      border: "1px solid #e5e7eb",
      cursor: "pointer",
      backgroundColor: "transparent",
    },
    buttonContent: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.header}>
          <SortingButton
            type="3"
            onClick={sortByLatest}
            isActive={sortBy === "latest"}
          >
            <div style={styles.buttonContent}>
              <Clock size={18} />
              最新
            </div>
          </SortingButton>

          <SortingButton
            type="3"
            onClick={sortByPopular}
            isActive={sortBy === "popular"}
          >
            <div style={styles.buttonContent}>
              <Flame size={18} />
              熱門
            </div>
          </SortingButton>

          <div style={styles.searchContainer}>
            <button style={styles.searchButton}>
              <MagnifyingGlass />
            </button>
          </div>
        </div>

        {posts.map((post, index) => (
          <ForumPost
            key={index}
            userImage={post.userImage}
            username={post.username}
            title={post.title}
            content={post.content}
            coverImage={post.coverImage}
            likes={post.likes}
            reposts={post.reposts}
            timeStamp={post.timeStamp}
          />
        ))}
      </div>
    </>
  );
}
