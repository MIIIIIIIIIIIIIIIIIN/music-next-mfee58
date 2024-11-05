import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./playlist.module.css"

export default function SpotifyPlaylist(props) {
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const playlistId = props.playlistId || "YOUR_DEFAULT_PLAYLIST_ID"; // 動態傳入或設置預設播放清單 ID

  // 刷新 access token 的函數
  async function refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
        {
          headers: {
            Authorization: `Basic ${btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken); // 更新 access token
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setError("Failed to refresh access token.");
      throw error;
    }
  }

  // 取得播放清單資料
  async function fetchPlaylistData(token) {
    try {
      //3Mk6qmUSVeeF5CLqkrkmTP
      const response = await axios.get(`https://api.spotify.com/v1/playlists/3Mk6qmUSVeeF5CLqkrkmTP`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylist(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // access token 過期，使用 refresh token 來刷新
        const refreshToken = "YOUR_REFRESH_TOKEN"; // 預先保存的 refresh token
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          // 使用新的 access token 重新取得播放清單資料
          await fetchPlaylistData(newAccessToken);
        } catch (refreshError) {
          console.error("Error retrying request after refreshing token:", refreshError);
        }
      } else {
        console.error("Error fetching playlist", error);
        setError("Failed to fetch playlist data.");
      }
    }
  }

  useEffect(() => {
    // 從 URL 中解析 access token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    setAccessToken(token);

    if (token) {
      fetchPlaylistData(token);
    }
  }, [accessToken]);

  if (!accessToken) {
    return <a href="http://localhost:8888/login">確認試聽</a>;
  }

  return (
    <>
      <div className={styles.container}>
      {/* <h1 className={styles.playlistTitle}>Spotify Playlist</h1> */}
      {error ? (
        <p>{error}</p>
      ) : playlist ? (
        <div>
          {/* <h2 className={styles.playlistTitle}>{playlist.name}</h2> */}
          {/* <img
            src={playlist.images[0]?.url}
            alt="Playlist Cover"
            className={styles.playlistCover}
          /> */}
          <ul className={styles.trackList}>
            {playlist.tracks.items.map((track, index) => (
              <li key={index} className={styles.trackItem}>
                {track.track.name} by {track.track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
    </>
  );
}
