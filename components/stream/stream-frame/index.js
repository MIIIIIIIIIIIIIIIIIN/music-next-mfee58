import React, { useEffect, useState } from "react";
import styles from "./stream-frame.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";


const LiveStream = ({
  videoId = "neKSP2P7FIY",
  streamerName = "DefaultStreamer",
}) => {
  const [streamData, setStreamData] = useState({
    viewerCount: 0,
    elapsedTime: "",
    title: "",
    isLive: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!videoId) {
      setError("YouTube Video ID not provided");
      setIsLoading(false);
      return;
    }

    const fetchStreamDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:3006/api/live-stream-details"
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch stream details");
        }
        const data = await response.json();
        setStreamData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stream data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreamDetails();
    const pollInterval = setInterval(fetchStreamDetails, 30000);
    return () => clearInterval(pollInterval);
  }, [videoId]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with Profile and Stream Info */}
      <div className={styles.header}>
        <div className={styles.profilePic}>
          <img src="/s_img/anya.png" alt={streamerName} />
        </div>
        <div className={styles.streamInfo}>
          <h2 className={styles.streamerName}>{streamerName}</h2>
          <div className={styles.decorativeLine} />
          <p className={styles.streamTitle}>
            {streamData.title || "Loading..."}
          </p>
        </div>
      </div>

      {/* Video Container */}
      <div className={styles.videoContainer}>
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={streamData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {/* Stats Overlay */}
      {!isLoading && (
        <div className={styles.statsContainer}>
          <div className={styles.viewerCount}>
            <ViewerCount /> {streamData.viewerCount.toLocaleString()}
          </div>
          <div className={styles.elapsedTime}>⏱️ {streamData.elapsedTime}</div>
        </div>
      )}
      {isLoading && (
        <p className={styles.loadingText}>Loading stream details...</p>
      )}
    </div>
  );
};

export default LiveStream;
