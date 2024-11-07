import styles from "./mem-acc.module.css";
import { useRouter } from "next/router";
import Nav from "@/components/public/nav";
import UserIcon from "../../public/user-icon";
import FormOption from "../form-option";
import FormInputM from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import InfoNav from "../info-nav-liam";
import FooterDeskTop from "@/components/public/footer/desktop";
import MemIcons from "../mem-icons";
import { useEffect, useState } from "react";

const MemberACC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/try-sess", {
          credentials: "include", // 攜帶 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        console.log(data);
  
        // setBirth(data.admin?.birth);

        setAccount(data.admin?.account);
        setPhone(data.admin?.phone);
        setEmail(data.admin?.email);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const handleClick = () => {
    router.push("/");
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // 基本的信箱格式檢查(包含 @符號 以及 .符號)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(emailValue));
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);

    // 手機格式驗證 (基本驗證)
    const phonePattern = /^(\+?\d{1,4}[-.\s]?)?(\d{10})$/;
    setPhoneValid(phonePattern.test(phoneValue));
  };

  return (
    <>
      {/* <Nav /> */}

      <div className={styles["member-acc"]}>
        <div className={styles.container}>
          <div className={styles["acc-nav"]}>
            {/* <InfoNav /> */}
          </div>
          <div className={styles["acc-main"]}>
            {/* 右側內容 */}
            <h5 className={styles["main-title"]}>帳號設定</h5>
            <div className={styles["main-body"]}>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>帳號(不會顯示於頁面)</h6>
                <div className={styles["body-input"]  }>
                  <MemIcons iconName="icon-user" />
                  {/* 預設 icon-mail, 中尺寸 */}
                  <FormInputM size="medium" value={account} readOnly={true} />
                  <ButtonToggleM
                    size="small"
                    className={styles["buttonToggle"]}
                  />
                </div>
              </div>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>手機</h6>
                <div className={styles["body-input"]}>
                  <MemIcons iconName="icon-phone" />
                  <FormInputM
                    size="medium"
                    value={phone}
                    onChange={handlePhoneChange}
                    isPhone={true} // 啟用手機格式驗證
                  />
                  <ButtonToggleM size="small" />
                </div>
                {!isPhoneValid && (
                  <div className={styles["error-text"]}>
                    請輸入有效的手機號碼
                  </div>
                )}
              </div>
              <div className={styles["body-sec"]}>
                <h6 className={styles["body-title"]}>信箱</h6>
                <div className={styles["body-input"]}>
                  <MemIcons iconName="icon-mail" />
                  <FormInputM
                    size="medium"
                    value={email}
                    onChange={handleEmailChange}
                    isEmail={true} // 啟用信箱格式驗證
                  />
                  <ButtonToggleM size="small" />
                </div>
                {!isEmailValid && (
                  <div className={styles["error-text"]}>
                    請輸入有效的信箱地址
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FooterDeskTop /> */}
    </>
  );
};

export default MemberACC;
