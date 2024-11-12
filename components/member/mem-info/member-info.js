import styles from "./member-info.module.css";
import { useRouter } from "next/router";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import { useEffect, useState } from "react";
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";
import axios from "axios";

const MemberInfo = () => {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [member, setMember] = useState({});
  const [isEditing, setIsEditing] = useState(false); // 控制是否在編輯模式
  const [message, setMessage] = useState("");

  // 從後端獲取會員資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        const data = await response.json();
        setMember(data.admin || {});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 保存暱稱的函數
  const handleSaveName = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3005/member/update-nickname",
        { nickname: member.nickname },
        { withCredentials: true }
      );
      setMessage(response.data.message || "暱稱已更新");
      setIsEditing(false); // 保存後退出編輯模式
    } catch (error) {
      console.error("Error updating nickname:", error);
      setMessage("更新暱稱失敗，請重試");
    }
  };

  return (
    <div className={styles["member-info"]}>
      <div className={styles.container}>
        <div className={styles["info-main"]}>
          <h5 className={styles["main-title"]}>基本資料</h5>
          <div className={styles["main-body"]}>
            <div className={styles["body-icon"]}>
              <ProfileIcons
                property1="lg"
                className={styles.header}
                img={member.icon || "/image/img-mem/user-logo000.jpg"} // 設置預設圖片
              />
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
                  {isEditing ? (
                    <>
                      <FormInput
                        value={member.nickname}
                        onChange={(e) =>
                          setMember((prevMember) => ({
                            ...prevMember,
                            nickname: e.target.value,
                          }))
                        }
                      />
                      <button onClick={handleSaveName}>保存</button>
                      <button onClick={() => setIsEditing(false)}>取消</button>
                    </>
                  ) : (
                    <>
                      <span>{member.nickname || "新增暱稱"}</span>
                      <button onClick={() => setIsEditing(true)}>編輯</button>
                    </>
                  )}
                </div>
                <h6 className={styles["left-title"]}>生日</h6>
                <div className={styles["left-text"]}>
                  <FormInput value={birth} readOnly />
                </div>
              </div>

              <div className={styles["input-right"]}>
                <h6 className={styles["right-title"]}>性別</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="gender"
                    initialValue={gender}
                    onChange={setGender}
                  />
                  <ButtonToggleM size="small" />
                </div>
                <h6 className={styles["right-title"]}>所在地</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="region"
                    initialValue={region}
                    onChange={setRegion}
                  />
                  <ButtonToggleM size="small" />
                </div>
              </div>
            </div>

            {/* 提示訊息 */}
            {message && <p className={styles["message"]}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;

