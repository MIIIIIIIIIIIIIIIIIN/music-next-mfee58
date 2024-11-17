import React, { useState, useEffect} from "react";
import axios from "axios";
import styles from "./playlist.module.css";
import { useRouter } from "next/router";
import MySpotifyPlayer from "./pv1";

export default function SpotifyPlaylist() {
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { pid } = router.query; // 產品資料庫 ID

  // 直接定義 playlistId
  const playlistId = "7Id3BfkmdnlIZ43TNqEhD6";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("access_token");
    setAccessToken(token);

    if (token && pid) {
      fetchPlaylistData(token, pid);
    }
  }, [pid]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/playlist/${playlistId}`, {
          params: { access_token: accessToken },
        });
        setPlaylist(response.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        // setError("Failed to fetch playlist data.");
      }
    };

    if (playlistId && accessToken) {
      fetchPlaylist();
    }
  }, [playlistId, accessToken]);

  async function fetchPlaylistData(token, pid) {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/product/${pid}?access_token=${token}`
      );
      setPlaylist(response.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      // setError("Failed to fetch playlist data.");
    }
  }

  if (!accessToken) {
    return (
      
        <a href={`http://localhost:3005/api/logintospotify?pid=${pid}`}><button className={styles.listenbutton}>點擊試聽</button></a>
      
    );
  }

  return (
    <div className={styles.container}>
      {error ? (
        <p>{error}</p>
      ) : playlist ? (
        <div>
          {/* <h2>{playlist.name}</h2> */}
          <div className={styles.albumcover}>
          <img
            src={playlist.images[0]?.url}
            alt="Playlist Cover"
            className={styles.playlistCover}
          />
          </div>
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
      <MySpotifyPlayer accessToken={accessToken} playlistId={playlistId}/>
    </div>
  );
}
