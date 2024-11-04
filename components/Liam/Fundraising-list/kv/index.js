import React, { useEffect, useRef, useState } from "react";
import styles from "./kv.module.css";

export default function Kv({
  title = "Farragol | 《 MindCapsule 》透明灰彩膠 | 黑膠",
}) {
  const barRef = useRef(null);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 進度條動畫
    const timeoutId = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = '80%';
      }
    }, 1000);

    // 數字動畫
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < 81) {
        setCount(currentCount);
        currentCount++;
      } else {
        clearInterval(interval);
      }
    }, 30); // 控制數字變化速度

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, []);
  return (
    <div >
      <div className={styles.top}>
        <div className={styles.title}>
          <a href="#">
            <h3>{title}</h3>
            <p>{count}%</p>
            <p>---</p>
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bar} style={{}}  ref={barRef}></div>
      </div>
    </div>
  );
}
