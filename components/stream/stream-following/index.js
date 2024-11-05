import { useState, useEffect } from "react";
import styles from "@/components/stream/stream-following/s_following.module.css";
import ViewerCount from "@/components/public/icons/viewer_count";

const FollowingStream = () => {
  const [streams, setStreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder data to simulate database response
  const mockStreamData = [
    {
      id: 1,
      streamerName: "Jimmy55555555555555",
      viewerCount: 5000,
      profileImage: "/s_img/test.jpg",
      isLive: true,
    },
    {
      id: 2,
      streamerName: "StreamMaster123",
      viewerCount: 3200,
      profileImage: "/s_img/streamer.jpg",
      isLive: true,
    },
    {
      id: 3,
      streamerName: "ProGamer789",
      viewerCount: 1500,
      profileImage: "/s_img/streamer1.jpg",
      isLive: true,
    },
  ];

  useEffect(() => {
    // Simulate fetching data from MySQL database
    const fetchStreams = async () => {
      try {
        // In real implementation, this would be an API call to your backend
        // const response = await fetch('/api/streams');
        // const data = await response.json();

        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStreams(mockStreamData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load streams");
        setIsLoading(false);
      }
    };

    fetchStreams();
  }, []);

  if (isLoading) {
    return <div className="text-center p-4">Loading streams...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-3">
      {streams.map((stream) => (
        <div key={stream.id} className={styles.followingStream}>
          <img
            className={styles.followingStreamChild}
            alt={`${stream.streamerName}'s stream`}
            src={stream.profileImage}
          />
          <div className={styles.streamerName}>{stream.streamerName}</div>
          <div className={styles.veiwerCount}>
            <ViewerCount />
            <div className={styles.div}>
              {stream.viewerCount.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingStream;
