import styles from "./mem-account.module.css";
import InfoNav from "../info-nav";

const Section1 = () => {
  return (
    <>

    <div className={styles.section3}>
<InfoNav />
      <div className={styles.right}>
        <div className={styles.line01}>
          <div className={styles.container}>
            <b className={styles.guavavibe}>帳號設定</b>
          </div>
          <div className={styles.s01}>
            <div className={styles.frameParent}>
              <div className={styles.frame}>
                <div className={styles.guavavibe}>帳號(不會顯示於頁面)</div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.iconsEssentialsParent}>
                  <img
                    className={styles.iconsEssentials}
                    alt=""
                    src="icons-Essentials.svg"
                  />
                  <div className={styles.guavavibe}>GuavaVibe</div>
                </div>
                <div className={styles.check}>
                  <div className={styles.check1}>
                    <div className={styles.guavavibe}>已驗證</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.s01}>
            <div className={styles.frameParent}>
              <div className={styles.div9}>手機</div>
              <div className={styles.frameContainer}>
                <div className={styles.iconsEssentialsParent}>
                  <img
                    className={styles.iconsAudio}
                    alt=""
                    src="icons-Audio.svg"
                  />
                  <div
                    className={styles.guavavibe}
                  >{`(+886) 912-345-678 `}</div>
                </div>
                <div className={styles.check2}>
                  <div className={styles.checkuncheck}>
                    <div className={styles.guavavibe}>待驗證</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.s01}>
            <div className={styles.frameParent}>
              <div className={styles.frame}>
                <div className={styles.guavavibe}>信箱</div>
              </div>
              <div className={styles.frameGroup}>
                <div className={styles.iconsEssentialsParent}>
                  <img
                    className={styles.iconsAudio}
                    alt=""
                    src="icons-messages.svg"
                  />
                  <div className={styles.guavavibe}>ballad@gmail.com</div>
                </div>
                <div className={styles.check}>
                  <div className={styles.check1}>
                    <div className={styles.guavavibe}>已驗證</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.line01Inner}>
            <img className={styles.frameChild} alt="" src="Vector 6.svg" />
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default Section1;
