import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function MySpotifyPlayer({ accessToken, playlistId }) {
  return (
    <SpotifyPlayer
      token={accessToken}
      uris={[`spotify:playlist:${playlistId}`]}
      styles={{
        bgColor: 'rgba(20, 255, 0, 0.5)',
        color: '#000000',
        loaderColor: '#fff',
        sliderColor: '#1db954',
        trackArtistColor: '#000000',
        trackNameColor: '#000000',
      }}
      autoPlay={true}
      play={true}
    />
  );
}
