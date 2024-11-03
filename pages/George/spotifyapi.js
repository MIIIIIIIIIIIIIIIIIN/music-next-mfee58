import React, { useState, useEffect } from "react";
import Spotifyplaylist from "@/components/George/spotifyAPI/playlist";
import SpotifyEmbedPlayer from "@/components/George/spotifyAPI/player";

export default function Spotifyapi() {
  return (
    <>
      <SpotifyEmbedPlayer />
      <Spotifyplaylist />
    </>
  );
}
