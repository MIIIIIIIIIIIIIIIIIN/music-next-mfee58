import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./member-info.module.css";
import FormInput from "../form-input";
import ButtonToggleM from "../button-show";
import Dropdown from "../form-option";
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";
import axios from "axios";

const MemberInfo = () => {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [member, setMember] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // 用於儲存選擇的圖片文件
  const [bio, setBio] = useState(""); // 新增簡介的狀態
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false); // Success overlay for both image upload and nickname update

  // 位於前端文件：member-info.js
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include", // 確保帶上 Cookie
        });
        const data = await response.json();
        if (data.admin) {
          setMember(data.admin); // 用戶已登入，設置 member 狀態
          setGender(data.admin.m_gender); // 設置性別狀態

          // 格式化 birth 只顯示 MM-DD
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
          setBirth(formattedBirth);

          setRegion(data.admin.m_location); // 假設還有所在地資料
                  // 確保日期格式正確並格式化為 YYYY-MM-DD

        if (!isNaN(birthDate)) {
          setBirth(birthDate.toISOString().split("T")[0]); // 格式化為 YYYY-MM-DD
        } else {
          console.error("無法解析的生日日期格式:", data.admin.m_birth);
          setBirth("日期格式錯誤");
        }
        } else {
          console.log("用戶尚未登入");
          router.push("/login"); // 如果尚未登入，跳轉到登入頁
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 讀取 Local Storage 中的簡介資料
    const savedBio = localStorage.getItem("bio");
    if (savedBio) {
      setBio(savedBio);
    }

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
      // setMessage(response.data.message || "暱稱已更新");
      setIsEditing(false);
      // Show success notification
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000); // 隱藏提示框
    } catch (error) {
      console.error("Error updating nickname:", error);
      setMessage("更新暱稱失敗，請重試");
    }
  };

  // 上傳圖片的函數

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setMessage("請選擇圖片檔案");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      setMessage("圖片大小不可超過 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("icon", selectedFile); // 'icon' 是後端接收的字段名

    try {
      const response = await axios.post(
        "http://localhost:3005/member/update-icon",
        formData,
        {
          withCredentials: true, // 確保請求攜帶 Cookie
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setMessage(response.data.message || "圖片已更新");
      setMember((prev) => ({ ...prev, icon: response.data.icon })); // 更新顯示的圖片
      // Show success notification
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("圖片上傳失敗，請重試");
    }
  };
  // 更新簡介的函數，並保存到 Local Storage
  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setBio(newBio);
    localStorage.setItem("bio", newBio);
  };

  return (
    <div className={styles["member-info"]}>
      <div className={styles.container}>
        <div className={styles["info-main"]}>
          <h5 className={styles["main-title"]}>基本資料</h5>
          <div className={styles["main-body"]}>
            <div className={styles["body-icon"]}>
              {/* <ProfileIcons
                property1="lg"
                className={styles.header}
                img={member.icon || "/image/img-mem/user-logo000.jpg"}
              /> */}
              <ProfileIcons
                property1="lg"
                className={styles.header}
                img={
                  member.icon
                    ? `http://localhost:3005${member.icon}`
                    : "/image/img-mem/user-logo000.jpg"
                }
              />
              <div className={styles["file-input-container"]}>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  accept="image/*" // 限制只能上傳圖片
                  className={styles["file-input"]}
                />
              </div>
              <button onClick={handleImageUpload}>上傳圖片</button>
            </div>
            <h6 className={styles["icon-title"]}>
              上傳頭像建議尺寸： 140x140px 以內，圖片檔案大小不可超過 2MB
            </h6>
            <h6 className={styles["input-top"]}>
              簡介 <FormInput value={bio} onChange={handleBioChange} />
            </h6>

            <div className={styles["body-input"]}>
              <div className={styles["input-left"]}>
                <h6 className={styles["left-title"]}>暱稱(顯示名稱)</h6>
                <div className={styles["left-text"]}>
                  {isEditing ? (
                    <>
                      <FormInput
                        size="small"
                        value={member.nickname}
                        onChange={(e) =>
                          setMember((prevMember) => ({
                            ...prevMember,
                            nickname: e.target.value,
                          }))
                        }
                      />
                      <button
                        onClick={handleSaveName}
                        className={styles.button1}
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className={styles.button1}
                      >
                        取消
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{member.nickname || "新增暱稱"}</span>
                      <button
                        onClick={() => setIsEditing(true)}
                        className={styles.button}
                      >
                        編輯
                      </button>
                    </>
                  )}
                </div>
                <h6 className={styles["left-title"]}>生日</h6>
                <div className={styles["left-text-birth"]}>
                  <FormInput value={birth} readOnly />
                </div>
              </div>

              <div className={styles["input-right"]}>
                <h6 className={styles["right-title"]}>性別</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="gender"
                    initialValue={member.gender}
                    onChange={setGender}
                  />
                  {/* <ButtonToggleM size="small" /> */}
                </div>
                <h6 className={styles["right-title"]}>所在地</h6>
                <div className={styles["right-text"]}>
                  <Dropdown
                    type="region"
                    // initialValue={member.region}
                    initialValue={member.location}
                    onChange={setRegion}
                  />
                  {/* <ButtonToggleM size="small" /> */}
                </div>
              </div>
            </div>
            {showSuccessOverlay && (
              <div className={styles.successOverlay}>
                <div className={styles.successMessage}>
                  <p>操作成功!</p>
                </div>
              </div>
            )}
            {message && <p className={styles["message"]}>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
