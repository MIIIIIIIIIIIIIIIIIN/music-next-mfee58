import styles from "./mem-XXX.module.css";
import { useRouter } from "next/router";
import Nav from "@/components/public/nav";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import InfoNav from "../info-nav-liam";
import FooterDeskTop from "@/components/public/footer/desktop";

const MemberTest = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <Nav />

      <div className={styles["member-XXX"]}>
        <div className={styles.container}>
        <div className={styles["XXX-nav"]}>
            <InfoNav />
          </div>
          <div className={styles["XXX-main"]}>
            <h5 className={styles["main-title"]}>(h5)個人頭像</h5>

            <div className={styles["main-body"]}>
              <div className={styles["body-icon"]}>
                <UserIcon />
                <h6>
                  (h6)上傳頭像 建議尺寸：360x360px 以上，圖片檔案大小不可超過 2MB
                </h6>
              </div>

              <div className={styles["body-input"]}>
                <div className={styles["input-left"]}>
                  {/* 左側內容 */}

                  <h7 className={styles["left-title"]}>(h7)暱稱(顯示名稱)</h7>

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

export default MemberTest;
