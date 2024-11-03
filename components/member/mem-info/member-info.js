import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import Nav from "@/components/public/nav";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import InfoNav from "../info-nav";
import FooterDeskTop from "@/components/public/footer/desktop";

const MemberInfo = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      {/* <Nav /> */}

      <div className={styles["member-info"]}>
        <div className={styles.container}>
        {/* <div className={styles["info-nav"]}>
            <InfoNav />
          </div> */}
          <div className={styles["info-main"]}>
            <h5 className={styles["main-title"]}>基本資料</h5>

            <div className={styles["main-body"]}>
              <div className={styles["body-icon"]}>
                <UserIcon />
            
              </div>
              <h6 className={styles["icon-title"]}>
                  上傳頭像建議尺寸： 140x140px 以內，圖片檔案大小不可超過 2MB
                </h6>
              <div className={styles["body-input"]}>
                <div className={styles["input-left"]}>
                  {/* 左側內容 */}

                  <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>

                  <div className={styles["left-text"]}>
                    <FormInput />
                  </div>

                  <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>

                  <div className={styles["left-text"]}>
                    <FormInput />
                  </div>
                </div>

                <div className={styles["input-right"]}>
                  {/* 右側內容 */}

                  <h6 className={styles["right-title"]}>性別</h6>
                  <div className={styles["right-text"]}>
                    <Dropdown type="gender" />
                    <ButtonToggleM size="small" />
                  </div>
                  <h6 className={styles["right-title"]}>所在地</h6>
                  <div className={styles["right-text"]}>
                    <Dropdown type="region" />
                    <ButtonToggleM size="small" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
