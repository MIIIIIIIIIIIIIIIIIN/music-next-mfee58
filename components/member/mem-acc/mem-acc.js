import styles from "./mem-acc.module.css";
import { useRouter } from "next/router";
import Nav from "@/components/public/nav";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import InfoNav from "../info-nav";
import FooterDeskTop from "@/components/public/footer/desktop";
import MemIcons from "../mem-icons";


const MemberACC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
      <Nav />

      <div className={styles["member-acc"]}>
        <div className={styles.container}>
          <div className={styles["acc-nav"]}>
            <InfoNav />
          </div>
          <div className={styles["acc-main"]}>
            {/* 右側內容 */}
            <h5 className={styles["main-title"]}>(h5)帳號設定</h5>
            <div className={styles["main-body"]}>
              <div className={styles["body-sec"]}>
                <h7 className={styles["body-title"]}>帳號(不會顯示於頁面)</h7>
                <div className={styles["body-input"]}>
      <MemIcons /> {/* 預設 icon-mail, 中尺寸 */}
                
                  <FormInput />
                  <ButtonToggleM size="small" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberACC;
