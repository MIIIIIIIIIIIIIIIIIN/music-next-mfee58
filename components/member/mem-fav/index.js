import styles from "./mem-fav.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav";
import Heart from "@/components/public/hearts";

const MemberFav = () => {
  return (
    <>
      <Nav />
      <div className={styles["member-fav"]}>
        <div className={styles["container"]}>
          <div className={styles["favNav"]}>
            <InfoNav />
          </div>
          <div className={styles.favMain}>
            <h5 className={styles.mainTitle}>收藏名單</h5>
            <div className={styles.mainBody}>
              <div className={styles.favInfo}>
                <div className={styles.info1}>
                  <div className={styles.favIcon}>
                    <img
                      src="/image/img-Jade/aimyon.png"
                      alt="icon-aimyon"
                      className={styles.photo}
                    />
                  </div>
                  <p className={styles.favName}>aimyonnnnnnnn-p</p>
                </div>
                <p className={styles.favInfo}>J-POP-p</p>
                <div className={styles.favInfo}><Heart /></div>
              </div>
            </div>
            <div className={styles.mainBody}>
              <div className={styles.favInfo}>
                <div className={styles.info1}>
                  <div className={styles.favIcon}>
                    <img
                      src="/image/img-Jade/aimyon.png"
                      alt="icon-aimyon"
                      className={styles.photo}
                    />
                  </div>
                  <p className={styles.favName}>aimyonnnnnnnn-p</p>
                </div>
                <p className={styles.favInfo}>J-POP-p</p>
                <div className={styles.favInfo}><Heart /></div>
              </div>
            </div>
            <div className={styles.mainBody}>
              <div className={styles.favInfo}>
                <div className={styles.info1}>
                  <div className={styles.favIcon}>
                    <img
                      src="/image/img-Jade/aimyon.png"
                      alt="icon-aimyon"
                      className={styles.photo}
                    />
                  </div>
                  <p className={styles.favName}>aimyonnnnnnnn-p</p>
                </div>
                <p className={styles.favInfo}>J-POP-p</p>
                <div className={styles.favInfo}><Heart /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberFav;
