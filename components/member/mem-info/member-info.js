import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import UserIcon from "../../public/user-icon";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import { useEffect, useState } from "react";

const MemberInfo = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/mem-data", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        setName(data.admin?.nickname);

        if (data.admin?.birth) {
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${birthDate.getFullYear()}-${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
          setBirth(formattedBirth);
        }

        // 設置性別和地區的初始值
        setGender(data.admin?.gender || "");
        setRegion(data.admin?.location || "");

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles["member-info"]}>
        <div className={styles.container}>
          <div className={styles["info-main"]}>
            <h5 className={styles["main-title"]}>基本資料</h5>
            <div className={styles["main-body"]}>
              <div className={styles["body-icon"]}>
                <UserIcon />
              </div>
              <h6 className={styles["icon-title"]}>
                上傳頭像建議尺寸： 140x140px 以內，圖片檔案大小不可超過 2MB
              </h6>
              <h6 className={styles["input-top"]}>
                簡介 <FormInput />
              </h6>
              <div className={styles["body-input"]}>
                <div className={styles["input-left"]}>
                  <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>
                  <div className={styles["left-text"]}>
                    <FormInput value={name} />
                  </div>
                  <h6 className={styles["left-title"]}>生日</h6>
                  <div className={styles["left-text"]}>
                    <FormInput value={birth} />
                  </div>
                </div>
                <div className={styles["input-right"]}>
                  <h6 className={styles["right-title"]}>性別</h6>
                  <div className={styles["right-text"]}>
                    <Dropdown type="gender" initialValue={gender} onChange={setGender} />
                    <ButtonToggleM size="small" />
                  </div>
                  <h6 className={styles["right-title"]}>所在地</h6>
                  <div className={styles["right-text"]}>
                    <Dropdown type="region" initialValue={region} onChange={setRegion} />
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
