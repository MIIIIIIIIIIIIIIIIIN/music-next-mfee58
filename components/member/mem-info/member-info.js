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
    // const [district, setDistrict] = useState("");
  const [member, setMember] = useState({});
  
  // 縣市行政區
  const [county, setCounty] = useState("");
  const [district, setDistrict] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [bio, setBio] = useState("");
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.admin) {
          console.log("後端資料:", data.admin); // 檢查後端資料
          setMember(data.admin);
          setGender(data.admin.gender);
  
          const birthDate = new Date(data.admin.birth);
          if (!isNaN(birthDate)) {
            setBirth(birthDate.toISOString().split("T")[0]);
          } else {
            console.error("無法解析的生日日期格式:", data.admin.m_birth);
            setBirth("日期格式錯誤");
          }
  
       // 直接使用 location 和 district 而不需要拆分
       setCounty(data.admin.location || "");
       setDistrict(data.admin.district || "");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [router]);
  

  // 單獨的圖片上傳函數
  const uploadImage = async (file) => {
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setMessage("圖片大小不可超過 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("icon", file);

    try {
      const response = await axios.post(
        "http://localhost:3005/member/update-icon",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMember((prev) => ({ ...prev, icon: response.data.icon }));
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("圖片上傳失敗，請重試");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // 更新選擇的檔案
      uploadImage(file); // 上傳圖片
    }
  };

  const handleSaveName = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3005/member/update-nickname",
        { nickname: member.nickname },
        { withCredentials: true }
      );
      setIsEditing(false);
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error updating nickname:", error);
      setMessage("更新暱稱失敗，請重試");
    }
  };

  const handleSaveBio = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3005/member/update-bio",
        { bio: member.bio },
        { withCredentials: true }
      );
      setIsEditingBio(false);
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error updating bio:", error);
      setMessage("更新簡介失敗，請重試");
    }
  };

  const handleBioChange = (e) => {
    const newBio = e.target.value;
    setBio(newBio);
    localStorage.setItem("bio", newBio);
  };

  // 新增函數用於保存性別到後端
  const handleSaveGender = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-gender",
        { gender },
        { withCredentials: true }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 1000);
    } catch (error) {
      console.error("Error updating gender:", error);
      setMessage("更新性別失敗，請重試");
    }
  };
// 新增函數用於保存所在地到後端
  const handleSaveLocation = async () => {
    try {
      await axios.put(
        "http://localhost:3005/member/update-location", // 使用 update-location 路由
        { county, district }, // 傳送縣市和行政區
        { withCredentials: true }
      );
      setShowSuccessOverlay(true);
      setTimeout(() => setShowSuccessOverlay(false), 2000);
    } catch (error) {
      console.error("Error updating location:", error);
      setMessage("更新所在地失敗，請重試");
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
                img={
                  member.icon
                    ? `http://localhost:3005${member.icon}`
                    : "/image/img-mem/user-logo000.jpg"
                }
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
                className={styles["file-input"]}
                style={{ display: "none" }}
              />
            </div>
            <h6 className={styles["icon-title"]}>
              上傳頭像建議尺寸：140x140px以內，圖片檔案大小不可超過2MB
            </h6>
            <h6>簡介</h6>

            <div className={styles["input-top"]}>
              {isEditingBio ? (
                <>
                  <FormInput
                    size="small"
                    value={member.bio}
                    onChange={(e) =>
                      setMember((prevMember) => ({
                        ...prevMember,
                        bio: e.target.value,
                      }))
                    }
                  />
                  <button onClick={handleSaveBio} className={styles.button1}>
                  儲存
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className={styles.button1}
                  >
                    取消
                  </button>
                </>
              ) : (
                <>
                  <span>{member.bio || "新增簡介"}</span>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className={styles.button}
                  >
                    編輯
                  </button>
                </>
              )}
            </div>

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
                        儲存
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
                    initialValue={gender}
                    onChange={(value) => setGender(value)}
                  />
                  <button onClick={handleSaveGender} className={styles.button}>
                    儲存
                  </button>
                </div>
                <h6 className={styles["right-title"]}>所在地</h6>
                <div className={styles["right-text"]}>
                <Dropdown
                    type="county"
                    sizeType={"medium"}
                    initialValue={{ county: member.location, district: member.district }}
                    onChange={(value) => {
    setCounty(value.county);
    setDistrict(value.district);
  }}
                  />
                  {/* <Dropdown
                    type="district"
                    initialValue={district}
                    onChange={(value) => setDistrict(value)}
                  /> */}
                  <button onClick={handleSaveLocation} className={styles.button}>
                    儲存
                  </button>
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
