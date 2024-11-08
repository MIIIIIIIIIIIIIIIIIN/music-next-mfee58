import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress } from "@mui/material";
import styles from "@/components/stream/more-like-this/more-loke-this.module.css";

const MoreLikeThis = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "http://192.168.37.184:3006/api/music-recommendations",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load recommendations. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.spacedContainer}>
        <h3 className={styles.title}>熱門推薦</h3>
        <div className={styles.grid}>
          {videos.map((video) => (
            <Card
              key={video.id}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                borderRadius: "0px",
                border: "solid 1px black",
                "&:hover": {
                  transform: "scale(1.05)",
                  borderRadius: "0px",
                },
              }}
              onClick={() =>
                window.open(
                  `https://www.youtube.com/watch?v=${video.id}`,
                  "_blank"
                )
              }
            >
              <CardContent sx={{ padding: 0, borderRadius: "0px" }}>
                <div className={styles.imageContainer}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.overlayText}>{video.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreLikeThis;
