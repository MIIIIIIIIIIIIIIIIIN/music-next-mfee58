import styles from "./mem-password.module.css";
import InfoNav from "../info-nav";
import Nav from "@/components/public/nav";
import FooterDeskTop from "@/components/public/footer/desktop";
import PasswordInput from "@/components/public/PasswordInput";
import ButtonShow from "../button-show";
import FormInput from "@/components/public/form-input";
import FormInputM from "../form-input";
import MemIcons from "../mem-icons";

const MemberPassword = () => {
  return (
    <>
      <Nav />

      <div className={styles["member-pw"]}>
        <div className={styles.container}>
          <div className={styles["pw-nav"]}>
            <InfoNav />
          </div>
          {/* <div className={styles["main-container"]}> */}
            <div className={styles["pw-main"]}>
              <h5 className={styles["main-title"]}>變更密碼</h5>

              <div className={styles["main-body"]}>
          
                <div className={styles["body-sec"]}>
                  <h7 className={styles["body-title"]}>舊密碼</h7>
                  <div className={styles["body-input"]}>
                    <PasswordInput size="large" placeholder="請輸入舊密碼" /> 
                  </div>
                </div>
                <div className={styles["body-sec"]}>
                  <h7 className={styles["body-title"]}>新密碼</h7>
                  <div className={styles["body-input"]}>
                    <PasswordInput size="large" placeholder="請輸入新密碼" /> 
                  </div>
                </div>
                <div className={styles["body-sec"]}>
                  <h7 className={styles["body-title"]}>信箱</h7>
                  <div className={styles["body-input"]}>
                    <PasswordInput size="large" placeholder="請輸入信箱" isEmail={true}/> 
                  </div>
                </div>

                
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
      {/* <FooterDeskTop /> */}
    </>
  );
};

export default MemberPassword;
