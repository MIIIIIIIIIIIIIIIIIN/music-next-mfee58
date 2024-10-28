import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInput from "../form-input";
import ButtonToggle from "../button-show";

const MemberInfo2 = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles["member-info"]}>
      <div className={styles.container}>
        <div className={styles["info-nav"]}>
          <div className={styles["nav-title"]}>會員中心</div>
          <div className={styles["nav-body"]}>
            <div className={styles["body-text"]}>基本資料</div>
            <div className={styles["body-text"]}>帳號設定</div>
            <div className={styles["body-text"]}>變更密碼</div>
            <div className={styles["body-text"]}>訂單查詢</div>
            <div className={styles["body-text"]}>收藏名單</div>
            <div className={styles["body-text"]}>帳號刪除</div>
          </div>
        </div>
        <div className={styles["info-main"]}>
          <div className={styles["main-title"]}>個人頭像</div>
          <div className={styles["main-body"]}>
            <div className={styles["body-icon"]}>
              <UserIcon />
              <div>
                上傳頭像 建議尺寸：360x360px 以上，圖片檔案大小不可超過 2MB
              </div>
            </div>

            <div className={styles["body-input"]}>
              <div className={styles["input-left"]}>
                {/* 左側內容 */}

                <div className={styles["left-title"]}>暱稱(顯示名稱)</div>

                <div className={styles["left-text"]}>
                  <FormInput />
                </div>

                <div className={styles["left-title"]}>暱稱(顯示名稱)</div>

                <div className={styles["left-text"]}>
                  <FormInput />
                </div>
              </div>

              <div className={styles["input-right"]}>
                {/* 右側內容 */}

                <div className={styles["right-title"]}>性別</div>
                <div className={styles["right-text"]}>
                  <FormOption />
                  <ButtonToggle className={styles["right-text2"]} />
                </div>
                <div className={styles["right-title"]}>性別</div>
                <div className={styles["right-text"]}>
                  <FormOption />
                  <ButtonToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={styles["info-main"]}>
          <div className={styles.top}>
            <div className={styles.s04}>
              <b className={styles["nav-title"]}>{`個人頭像 `}</b>
              <UserIcon />
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
                <div className={styles.div11}>暱稱(顯示名稱)</div>
                <div className={styles.guavavibeWrapper}>
                  <div className={styles.b}>GuavaVibe</div>
                </div>
              </div>
              <div className={styles.s011}>
                <div className={styles.div11}>生日/ 成立時間</div>
                <div className={styles.guavavibeParent}>
                  <div className={styles.b}>2000/ 01/ 01</div>
                  <div className={styles.check}>
                    <div className={styles.b}>隱藏</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.right1}>
              <div className={styles.s012}>
                <div className={styles.div14}>性別</div>
                <div className={styles.checkParent}>
                  <div className={styles.check1}>
                    <div className={styles.div15}>男</div>
                    <img
                      className={styles.iconsArrow}
                      alt=""
                      src="icons-Arrow.svg"
                    />
                  </div>
                  <div className={styles.check2}>
                    <div className={styles.b}>隱藏</div>
                  </div>
                </div>
              </div>
              <div className={styles.s012}>
                <div className={styles.div14}>所在地</div>
                <div className={styles.checkParent}>
                  <div className={styles.check1}>
                    <div className={styles.div15}>台北</div>
                    <img
                      className={styles.iconsArrow}
                      alt=""
                      src="icons-Arrow.svg"
                    />
                  </div>
                  <div className={styles.check4}>
                    <div className={styles.b}>顯示</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MemberInfo2;
