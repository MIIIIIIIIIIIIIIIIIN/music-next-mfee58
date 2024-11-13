import React, { useState, useEffect} from "react";
import axios from "axios";
import styles from "./playlist.module.css";
import { useRouter } from "next/router"; 

export default function SpotifyPlaylist() {
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    // 從 URL 中解析 access token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    setAccessToken(token);

    if (token && pid) {
      fetchPlaylistData(token, pid);
    }
  }, [pid]);

  // 抓取播放清單資料
  async function fetchPlaylistData(token, pid) {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/product/${pid}?access_token=${token}`
      );
      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setError("Failed to fetch playlist data.");
    }
  }
  if (!accessToken) {
    return (
    <button>
    <a href={`http://localhost:3005/api/logintospotify?pid=${pid}`}>確認試聽</a>
    </button>
  )
  }

  return (
    <div className={styles.container}>
      {error ? (
        <p>{error}</p>
      ) : playlist ? (
        <div>
          <h2>{playlist.name}</h2>
          <img
            src={playlist.images[0]?.url}
            alt="Playlist Cover"
            className={styles.playlistCover}
          />
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
