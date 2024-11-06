// pages/index.js
import { useEffect, useState } from "react";

// 統一的配置
const SPOTIFY_CONFIG = {
  CLIENT_ID: "41de188c605d4fbcaf8dc68fbfa75be3",
  REDIRECT_URI: "http://localhost:3000",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  RESPONSE_TYPE: "token",
  SCOPES: [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join(" "),
};

export default function Home() {
  // 狀態定義
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [initError, setInitError] = useState(null);

  // Token 處理
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      let storedToken = window.localStorage.getItem("token");

      if (!storedToken && hash) {
        storedToken = hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          ?.split("=")[1];

        window.location.hash = "";
        if (storedToken) {
          window.localStorage.setItem("token", storedToken);
        }
      }

      setToken(storedToken || "");
    }
  }, []);

  // 播放器初始化
  useEffect(() => {
    if (!token) return;

    if (
      !document.querySelector(
        'script[src="https://sdk.scdn.co/spotify-player.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("SDK Ready, initializing player...");
      const spotifyPlayer = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      spotifyPlayer.addListener("initialization_error", ({ message }) => {
        console.error("初始化錯誤:", message);
        setInitError(`初始化失敗: ${message}`);
      });

      spotifyPlayer.addListener("authentication_error", ({ message }) => {
        console.error("認證錯誤:", message);
        setInitError(`認證失敗: ${message}`);
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Player ready with Device ID", device_id);
        setDeviceId(device_id);
        setIsPlayerReady(true);
        setInitError(null);

        fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            device_ids: [device_id],
            play: false,
          }),
        }).catch((error) => console.error("設置設備時發生錯誤:", error));
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID is not ready:", device_id);
        setIsPlayerReady(false);
      });

      spotifyPlayer.connect().then((success) => {
        if (success) {
          console.log("Successfully connected to Spotify!");
        } else {
          setInitError("連接到 Spotify 失敗");
        }
      });

      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  const login = () => {
    const authUrl = `${SPOTIFY_CONFIG.AUTH_ENDPOINT}?client_id=${
      SPOTIFY_CONFIG.CLIENT_ID
    }&redirect_uri=${SPOTIFY_CONFIG.REDIRECT_URI}&response_type=${
      SPOTIFY_CONFIG.RESPONSE_TYPE
    }&scope=${encodeURIComponent(SPOTIFY_CONFIG.SCOPES)}&show_dialog=true`;
    window.location.href = authUrl;
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
    setSearchResults([]);
    setCurrentTrack(null);
    if (player) {
      player.disconnect();
    }
    setPlayer(null);
    setDeviceId(null);
    setIsPlayerReady(false);
    setInitError(null);
  };

  // 搜尋功能
  const searchTracks = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchKey
        )}&type=track&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.tracks?.items) {
        setSearchResults(data.tracks.items);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("搜尋時發生錯誤:", error);
      setSearchResults([]);
    }
  };

  // 播放控制
  const playTrack = async (trackId) => {
    if (!isPlayerReady || !deviceId) {
      console.error("播放器尚未準備就緒");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: [`spotify:track:${trackId}`],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const track = searchResults.find((track) => track.id === trackId);
      if (track) {
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("播放時發生錯誤:", error);
    }
  };

  const pauseTrack = async () => {
    if (!player) return;
    try {
      await player.pause();
      setIsPlaying(false);
    } catch (error) {
      console.error("暫停時發生錯誤:", error);
    }
  };

  const resumeTrack = async () => {
    if (!player) return;
    try {
      await player.resume();
      setIsPlaying(true);
    } catch (error) {
      console.error("繼續播放時發生錯誤:", error);
    }
  };

  // UI 渲染
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-4">
              Spotify Player
            </h1>
          </div>

          {!token ? (
            <button
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
              onClick={login}
            >
              登入 Spotify
            </button>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">已登入</h3>
                  {!isPlayerReady && (
                    <p className="text-sm text-yellow-600">
                      正在初始化播放器...
                    </p>
                  )}
                  {initError && (
                    <p className="text-sm text-red-600">{initError}</p>
                  )}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                  onClick={logout}
                >
                  登出
                </button>
              </div>

              <form onSubmit={searchTracks} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="搜尋歌曲..."
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
                    disabled={!isPlayerReady}
                  >
                    搜尋
                  </button>
                </div>
              </form>

              {currentTrack && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold">正在播放:</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{currentTrack.name}</p>
                      <p className="text-gray-600 text-sm">
                        {currentTrack.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {isPlaying ? (
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                          onClick={pauseTrack}
                          disabled={!isPlayerReady}
                        >
                          暫停
                        </button>
                      ) : (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                          onClick={resumeTrack}
                          disabled={!isPlayerReady}
                        >
                          播放
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold">搜尋結果:</h4>
                  <div className="space-y-2">
                    {searchResults.map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition duration-200"
                      >
                        <div>
                          <p className="font-medium">{track.name}</p>
                          <p className="text-gray-600 text-sm">
                            {track.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </p>
                        </div>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md transition duration-200"
                          onClick={() => playTrack(track.id)}
                          disabled={!isPlayerReady}
                        >
                          播放
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <button>
        <a href="./login">LOGIN</a>
      </button>
    </>
  );
}
