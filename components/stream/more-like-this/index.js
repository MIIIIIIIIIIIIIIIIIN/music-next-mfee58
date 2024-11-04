import React, { useState, useEffect } from "react";
import { Card, CardContent, CircularProgress } from "@mui/material";
import styles from "@/components/stream/more-like-this/more-loke-this.module.css";

const MoreLikeThis = ({ apiKey }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // When you have your API key, you would make the actual API call here
        // For now, we'll use placeholder data
        const mockVideos = [
          {
            id: "1",
            thumbnail:
              "https://yume-muso.com/wp-content/uploads/2020/06/%E7%9C%9F%E7%94%B0%E4%B8%B8%E3%80%8024.jpg",
            title: "Stream Highlight",
          },
          {
            id: "2",
            thumbnail:
              "https://blog.zh-hant.playstation.com/tachyon/sites/8/2024/05/45f2bc21fc735dc3dc38a547722009ef94f80c4e.jpg",
            title: "Monster Hunter",
          },
          {
            id: "3",
            thumbnail:
              "https://clan.akamai.steamstatic.com/images/43315296/274ea568ec2da6c61e5f3abae6ad7b8abeb12076.png",
            title: "Epic Battle Scene",
          },
          {
            id: "4",
            thumbnail:
              "https://www-static.warframe.com/images/longlanding/warframe-metacard.png",
            title: "Space Exploration",
          },
        ];

        setVideos(mockVideos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [apiKey]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.spacedContainer}>
        <h3 className={styles.title}>看更多...</h3>
        <div className={styles.grid}>
          {videos.map((video) => (
            <Card
              key={video.id}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent sx={{ padding: 0 }}>
                <div className={styles.imageContainer}>
                  <img
                    src={video.thumbnail}
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
