import React from "react";
import { useEffect, useState } from "react";
import ForumContainer from "@/components/forum/forum";
import NavBar from "@/components/public/nav";
import { Fade } from "react-awesome-reveal";
import { AnimatedBackground } from "animated-backgrounds";
import Loading from "@/components/forum/loading";

export default function Forum() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set to 2.5s (2100ms + 400ms buffer) as that's when the last animation finishes
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <AnimatedBackground
        animationName="geometricShapes"
        style={{ opacity: 0.5 }}
      />
      <Fade delay={100} cascade damping={0.1}>
        <ForumContainer />
      </Fade>
    </div>
  );
}
