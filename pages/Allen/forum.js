import React from "react";
import ForumContainer from "@/components/forum/forum";
import NavBar from "@/components/public/nav";
import { Fade } from "react-awesome-reveal";
import { AnimatedBackground } from "animated-backgrounds";

export default function test() {
  return (
    <>
      <NavBar />
      <AnimatedBackground
        animationName="geometricShapes"
        style={{ opacity: 0.5 }}
      />
      <Fade delay={1e2} cascade damping={1e-1}>
        <ForumContainer />
      </Fade>
    </>
  );
}
