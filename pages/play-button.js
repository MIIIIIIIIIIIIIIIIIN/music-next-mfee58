import React from "react";
import PlayButton from "../components/JadeTest/play-button";

const PlayButtonPage = () => {
  return (
    <div>
      <h2>Small Play Button</h2>
      <PlayButton size="small" />

      <h2>Medium Play Button</h2>
      <PlayButton size="medium" />

      <h2>Large Play Button</h2>
      <PlayButton size="large" />
    </div>
  );
};

export default PlayButtonPage;
