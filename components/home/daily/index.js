import styles from "./daily.module.css";
import Heart from "@/components/public/hearts";
import TimelineComponent from "./time-line";

const Daily = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <a href="#">
          <div className={styles.rectangleWrapper}>
            <img className={styles.frameChild} alt="" src="./day.jpg" />
          </div>
          <div className={styles.runawayParent}>
            <div className={styles.runaway}>RUNAWAY</div>
            <div className={styles.jeans}>JEANS</div>
          </div>
        </a>
      </div>
      <div className={styles.frameContainer}>
        <TimelineComponent />
      </div>
    </div>
  );
};

export default Daily;
