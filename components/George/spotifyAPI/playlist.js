import React, { useEffect, useState } from "react";
import axios from "axios";

function Spotifyplaylist() {
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // 從 URL 中解析存取 token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    setAccessToken(token);

    if (token) {
      axios
        .get("https://api.spotify.com/v1/playlists/1rlVbPZEYLNHHICSQE4dJ9", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        // .get("https://api.spotify.com/v1/playlists/{playlist_id}",{
        //   header:{
        //     Authorization: `Bearer ${token}`
        //   },
        // })
        .then((response) => {
          setPlaylist(response.data);
        })
        .catch((error) => {
          console.error("Error fetching playlist", error);
        });
    }
  }, []);

  if (!accessToken) {
    return <a href="http://localhost:8888/login">Login to Spotify</a>;
  }

  return (
    <div>
      <h1>Spotify Playlist</h1>
      {playlist ? (
        <div>
          <h2>{playlist.name}</h2>
          <img src={playlist.images[0].url} alt="Playlist Cover" />
          <ul>
            {playlist.tracks.items.map((track, index) => (
              <li key={index}>
                {track.track.name} by {track.track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
}

export default Spotifyplaylist;
