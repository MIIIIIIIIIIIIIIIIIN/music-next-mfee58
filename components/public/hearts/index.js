import React, { useState, useEffect } from "react";
import { Heart as HeartIcon } from "lucide-react";
import { useRouter } from "next/router";
import styles from "./hearts.module.css";

const Heart = ({ size = 1, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const { project } = router.query;

  // Check if project is in favorites when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!project) return;
      
      try {
        const response = await fetch(`http://localhost:3005/fundraiser/favorites/check/${project}`, {
          method: 'GET',
          credentials: 'include', // Include cookies if using session-based auth
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setIsActive(data.isFavorite);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [project]);

  const handleClick = async () => {
    if (!project) return;

    try {
      const endpoint = isActive
        ? `http://localhost:3005/fundraiser/favorites/remove/${project}`
        : `http://localhost:3005/fundraiser/favorites/add/${project}`;

      const response = await fetch(endpoint, {
        method: isActive ? 'DELETE' : 'POST',
        credentials: 'include', // Include cookies if using session-based auth
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsActive(!isActive);
        
        // Call the onClick prop if provided
        if (onClick) {
          onClick(!isActive);
        }

        // Show feedback to user (optional)
        const action = isActive ? '移除最愛' : '加入最愛';
        console.log(`成功${action}`);
      } else {
        const error = await response.json();
        console.error('Failed to update favorite:', error);
        
        // Show error to user (optional)
        console.error(`無法${isActive ? '移除' : '加入'}最愛`);
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const getHeartClass = () => {
    const state = isActive ? "active" : "default";
    return `${styles.heart} ${styles[`heart${size}-${state}`]} ${
      isActive ? styles.active : ""
    }`;
  };

  return (
    <div className={styles.heartContainer}>
      <HeartIcon
        className={getHeartClass()}
        fill={isActive ? "#FF0000" : "none"}
        onClick={handleClick}
        stroke={isActive ? "#FF0000" : "#494949"}
      />
    </div>
  );
};

export default Heart;