import React, { useEffect, useState } from "react";
import styles from "./stream-frame.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";

const LiveStream = ({
  videoId = "38ygP8qc7Uc",
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
          `http://192.168.37.184:3006/api/live-stream-details/${videoId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        // Log the raw response for debugging
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        // Try to parse the response as JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(
            `Failed to parse response as JSON: ${responseText.substring(
              0,
              100
            )}...`
          );
        }

        if (!response.ok) {
          throw new Error(data.message || `Server returned ${response.status}`);
        }

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

  // Rest of the component remains the same...
  return (
    <div className={styles.container}>
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

      <div className={styles.videoContainer}>
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={streamData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {!isLoading && (
        <div className={styles.statsContainer}>
          <div className={styles.viewerCount}>
            <ViewerCount /> {streamData.viewerCount?.toLocaleString() || "0"}
          </div>
          <div className={styles.elapsedTime}>
            ⏱️ {streamData.elapsedTime || "0h 0m"}
          </div>
          {streamData.isLive && (
            <div className={styles.statusIndicator}>
              <span
                className={`${styles.statusDot} ${styles.statusDotLive}`}
              ></span>
              <span>LIVE</span>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <p className={styles.loadingText}>Loading stream details...</p>
      )}

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LiveStream;
