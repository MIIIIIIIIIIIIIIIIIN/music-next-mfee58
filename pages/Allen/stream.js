import React from "react";
import FollowingStream from "@/components/stream/stream-following";
import LiveStream from "@/components/stream/stream-frame";
import ChatRoom from "@/components/stream/chat";
import MoreLikeThis from "@/components/stream/more-like-this";
import NavBar from "@/components/public/nav";

export default function test() {
  return (
    <>
      <NavBar />
      <div
        style={{ margin: "15px", justify: "space-between", display: "flex" }}
      >
        <div>
          <FollowingStream />
          <FollowingStream />
          <FollowingStream />
        </div>
        <LiveStream streamerName="ちちのムスメ" />
        <ChatRoom />
      </div>
      <MoreLikeThis />
    </>
  );
}
