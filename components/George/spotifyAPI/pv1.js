import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function MySpotifyPlayer({ accessToken, playlistId }) {
  return (
    <SpotifyPlayer
      token={accessToken}
      uris={[`spotify:playlist:${playlistId}`]}
      styles={{
        bgColor: '#1db954',
        color: '#ffffff',
        loaderColor: '#fff',
        sliderColor: '#1db954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
      autoPlay={true}
      play={true}
    />
  );
}
