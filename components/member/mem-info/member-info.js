import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";

const MemberInfo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles["member-info"]}>
      <div className={styles.container}>
        <div className={styles["info-nav"]}>
          <h5 className={styles["nav-title"]}>會員中心</h5>
          <div className={styles["nav-body"]}>
            <h6 className={styles["body-text"]}>基本資料</h6>
            <h6 className={styles["body-text"]}>帳號設定</h6>
            <h6 className={styles["body-text"]}>變更密碼</h6>
            <h6 className={styles["body-text"]}>訂單查詢</h6>
            <h6 className={styles["body-text"]}>收藏名單</h6>
            <h6 className={styles["body-text"]}>帳號刪除</h6>
          </div>
        </div>
        <div className={styles["info-main"]}>
          <h5 className={styles["main-title"]}>個人頭像</h5>
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

                <h7 className={styles["left-title"]}>暱稱(顯示名稱)</h7>

                <div className={styles["left-text"]}>
                  <FormInput />
                </div>

                <h7 className={styles["left-title"]}>暱稱(顯示名稱)</h7>

                <div className={styles["left-text"]}>
                  <FormInput />
                </div>
              </div>

              <div className={styles["input-right"]}>
                {/* 右側內容 */}

                <h7 className={styles["right-title"]}>性別</h7>
                <div className={styles["right-text"]}>
                <Dropdown type="gender" />
                  <ButtonToggleM size="small" />
                </div>
                <h7 className={styles["right-title"]}>所在地</h7>
                <div className={styles["right-text"]}>
                <Dropdown type="region" />
                  <ButtonToggleM size="small"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
