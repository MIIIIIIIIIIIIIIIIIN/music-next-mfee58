import styles from "./mem-fav.module.css";
import Nav from "@/components/public/nav";
import InfoNav from "../info-nav";

const MemberFav = () => {
  return (
    <>
      <Nav />
      <div className={styles.section5}>
        <InfoNav />

        <div className={styles.right}>
          <div className={styles.favList}>
            <div className={styles.container}>
              <b className={styles.style}>收藏名單</b>
            </div>
            <div className={styles.favListInner}>
              <div className={styles.frameParent}>
                <div className={styles.frameGroup}>
                  <div className={styles.frameWrapper}>
                    <div className={styles.followingStreamParent}>
                      <div className={styles.followingStream}>
                        <img
                          className={styles.followingStreamChild}
                          alt=""
                          src="Ellipse 23.png"
                        />
                        <div className={styles.streamerName}>
                          Jimmy55555555555555
                        </div>
                      </div>
                      <div className={styles.styleWrapper}>
                        <div className={styles.style}>folk/country</div>
                      </div>
                      <div className={styles.heartWrapper}>
                        <img
                          className={styles.heartIcon}
                          alt=""
                          src="heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <div className={styles.followingStreamParent}>
                      <div className={styles.followingStream}>
                        <img
                          className={styles.followingStreamChild}
                          alt=""
                          src="Ellipse 23.png"
                        />
                        <div className={styles.streamerName}>
                          Jimmy55555555555555
                        </div>
                      </div>
                      <div className={styles.styleWrapper}>
                        <div className={styles.style}>folk/country</div>
                      </div>
                      <div className={styles.heartWrapper}>
                        <img
                          className={styles.heartIcon}
                          alt=""
                          src="heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <div className={styles.followingStreamParent}>
                      <div className={styles.followingStream}>
                        <img
                          className={styles.followingStreamChild}
                          alt=""
                          src="Ellipse 23.png"
                        />
                        <div className={styles.streamerName}>
                          Jimmy55555555555555
                        </div>
                      </div>
                      <div className={styles.styleWrapper}>
                        <div className={styles.style}>folk/country</div>
                      </div>
                      <div className={styles.heartWrapper}>
                        <img
                          className={styles.heartIcon}
                          alt=""
                          src="heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <div className={styles.followingStreamParent}>
                      <div className={styles.followingStream}>
                        <img
                          className={styles.followingStreamChild}
                          alt=""
                          src="Ellipse 23.png"
                        />
                        <div className={styles.streamerName}>
                          Jimmy55555555555555
                        </div>
                      </div>
                      <div className={styles.styleWrapper}>
                        <div className={styles.style}>folk/country</div>
                      </div>
                      <div className={styles.heartWrapper}>
                        <img
                          className={styles.heartIcon}
                          alt=""
                          src="heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.frameWrapper}>
                    <div className={styles.followingStreamParent}>
                      <div className={styles.followingStream}>
                        <img
                          className={styles.followingStreamChild}
                          alt=""
                          src="Ellipse 23.png"
                        />
                        <div className={styles.streamerName}>
                          Jimmy55555555555555
                        </div>
                      </div>
                      <div className={styles.styleWrapper}>
                        <div className={styles.style}>folk/country</div>
                      </div>
                      <div className={styles.heartWrapper}>
                        <img
                          className={styles.heartIcon}
                          alt=""
                          src="heart.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <img className={styles.frameChild} alt="" src="Line 12.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberFav;
