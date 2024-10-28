import styles from "./Frame.module.css";

const Daily = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.rectangleWrapper}>
          <img className={styles.frameChild} alt="" src="Rectangle 12.png" />
        </div>
        <div className={styles.runawayParent}>
          <div className={styles.runaway}>RUNAWAY</div>
          <div className={styles.jeans}>JEANS</div>
        </div>
      </div>
      <div className={styles.frameContainer}>
        <div className={styles.wrapper}>
          <div className={styles.runaway}>(09-09)</div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.container}>
            <b className={styles.b}>(09-10)</b>
          </div>
          <div className={styles.frameParent1}>
            <div className={styles.frameParent2}>
              <div className={styles.frame}>
                <img className={styles.icon} alt="" src="+.svg" />
              </div>
              <div className={styles.heartWrapper}>
                <img className={styles.heartIcon} alt="" src="heart.svg" />
              </div>
            </div>
            <div className={styles.div1}>
              每日一曲，從日常的編輯推薦中再次精選而出，是街聲給每一首好作品的至高激賞與鼓勵
            </div>
          </div>
          <b className={styles.b1}>+1</b>
        </div>
        <div className={styles.wrapper1}>
          <div className={styles.runaway}>(09-11)</div>
        </div>
      </div>
    </div>
  );
};

export default Daily;
