import React from "react";
import { useEffect, useState } from "react";
import ForumContainer from "@/components/forum/forum-all";
import NavBar from "@/components/public/nav";
import { Fade } from "react-awesome-reveal";
import MotionBackground from "@/components/forum/video-backgorund";
import Loading from "@/components/forum/loading";

export default function Forum() {
  //想使用 loading screen 的人請複製這段，由此開始
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //2500ms 為動畫結束時間，可自行調整
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  //到這裡

  return (
    <div className="min-h-screen">
      <NavBar />
      <MotionBackground
        videoSource="../forum-back.mp4"
        overlayColor="rgba(0, 0, 0, 0.3)"
      >
        <Fade delay={100} cascade damping={0.1}>
          <ForumContainer />
        </Fade>
      </MotionBackground>
    </div>
  );
}
