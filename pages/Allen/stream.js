import React from "react";
import FollowingStream from "@/components/stream/stream-following";
import LiveStream from "@/components/stream/stream-frame";
import ChatRoom from "@/components/stream/chat";
import MoreLikeThis from "@/components/stream/more-like-this";
import NavBar from "@/components/public/nav";
import DarkModeToggle from "@/components/stream/dark-mode";

export default function Stream() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const styles = {
    container: {
      margin: isMobile ? "0px" : "15px",
      display: "flex",
      justifyContent:isMobile ? "start": "space-between",
      flexDirection: isMobile ? "column" : "row",
      backgroundColor: "var(--background-color)",
      color: "var(--text-color)",
      minHeight: "100vh",
      transition: "all 1s ease",
    },
    sideBar: {
      marginTop: isMobile ? "2rem" : "4rem",
    },
  };

  return (
    <>
      <NavBar />
      <div style={styles.container}>
        <div style={styles.sideBar}>
          <DarkModeToggle />
          <FollowingStream />
        </div>
        <LiveStream streamerName="ちちのムスメ" />
        <ChatRoom />
      </div>
      <MoreLikeThis />
    </>
  );
}
