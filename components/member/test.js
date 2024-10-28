import styles from "./Section.module.css";

const Section = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.s03}>
        <b className={styles.b}>會員中心</b>
        <div className={styles.body}>
          <div className={styles.p}>
            <div className={styles.wrapper}>
              <b className={styles.guavavibe}>基本資料</b>
            </div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>帳號設定</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>變更密碼</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>訂單查詢</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div3}>折價券</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>收藏名單</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>封鎖名單</div>
          </div>
          <div className={styles.p1}>
            <div className={styles.div}>帳號刪除</div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.s04}>
            <b className={styles.b}>{`個人頭像 `}</b>
            <img className={styles.s04Child} alt="" src="Frame 34.png" />
            <div className={styles.x360px2mbContainer}>
              <p className={styles.x360px2mb}>上傳頭像</p>
              <p className={styles.x360px2mb}>
                建議尺寸：360x360px 以上，圖片檔案大小不可超過 2MB
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.s01}>
              <div className={styles.div7}>暱稱(顯示名稱)</div>
              <div className={styles.guavavibeWrapper}>
                <div className={styles.guavavibe}>GuavaVibe</div>
              </div>
            </div>
            <div className={styles.s011}>
              <div className={styles.div7}>生日/ 成立時間</div>
              <div className={styles.guavavibeParent}>
                <div className={styles.guavavibe}>2000/ 01/ 01</div>
                <div className={styles.check}>
                  <div className={styles.guavavibe}>隱藏</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right1}>
            <div className={styles.s012}>
              <div className={styles.div10}>性別</div>
              <div className={styles.checkParent}>
                <div className={styles.check1}>
                  <div className={styles.div11}>男</div>
                  <img
                    className={styles.iconsArrow}
                    alt=""
                    src="icons-Arrow.svg"
                  />
                </div>
                <div className={styles.check2}>
                  <div className={styles.guavavibe}>隱藏</div>
                </div>
              </div>
            </div>
            <div className={styles.s012}>
              <div className={styles.div10}>所在地</div>
              <div className={styles.checkParent}>
                <div className={styles.check1}>
                  <div className={styles.div11}>台北</div>
                  <img
                    className={styles.iconsArrow}
                    alt=""
                    src="icons-Arrow.svg"
                  />
                </div>
                <div className={styles.check4}>
                  <div className={styles.guavavibe}>顯示</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
