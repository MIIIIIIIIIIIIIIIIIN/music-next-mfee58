import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css";
import dynamic from "next/dynamic";

// 動態導入 ProfileIcons
const ProfileIcons = dynamic(
  () => import("@/components/public/profileIcons/ProfileIcons"),
  {
    ssr: false,
    loading: () => <div className={styles.iconPlaceholder}></div>,
  }
);

const BlogNav = ({ memberData = {} }) => {
  // 提供默認值
  const [member, setMember] = useState({});
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {

    if (!memberData) return; // 如果 memberData 為 undefined，直接返回

    // 設置基本資料
    setName(memberData.m_nickname || "");
    setLocation(memberData.m_location || "");
    setGender(memberData.m_gender || "");
    setBio(memberData.m_bio || "");
    setDistrict(memberData.m_district || "");

    // 處理生日
    if (memberData.m_birth) {
      try {
        const birthDate = new Date(memberData.m_birth);
        if (!isNaN(birthDate.getTime())) {
          const formattedBirth = birthDate.toLocaleDateString("zh-TW", {
            timeZone: "Asia/Taipei",
            month: "2-digit",
            day: "2-digit",
          });
          setBirth(formattedBirth);
        } else {
          setBirth("未知日期");
        }
      } catch (error) {
        console.warn("Invalid birth date:", memberData.m_birth);
        setBirth("未知日期");
      }
    }
  }, [memberData]);

  // 安全地取得圖片URL
  const getImageUrl = () => {
    if (!memberData) return "/image/img-mem/user-logo000.jpg";
    return memberData.m_icon
      ? `http://localhost:3005${memberData.m_icon}`
      : "/image/img-mem/user-logo000.jpg";
  };

  return (
    <div className={styles["blogNav"]}>
      <div className={styles["icon"]}>
        <ProfileIcons
          property1="lg"
          className={styles.header}
          img={getImageUrl()}
        />
      </div>
      <h4 className={styles["name"]}>{name || "未設定暱稱"}</h4>
      <div className={styles["info"]}>
        <div className={styles["gender"]}>{gender || "未設定性別"}</div>
        <div className={styles["birth"]}>{birth || "未設定生日"}</div>

        <div className={styles["else"]}>
          <div className={styles["location"]}>{location || "未設定地區"}</div>
          <div className={styles["location"]}>{district || "未設定區域"}</div>
        </div>
      </div>
      <div className={styles["bio"]}>
        <div className={styles["bio"]}>{bio || "未設定簡介"}</div>
      </div>
    </div>
  );
};

// 使用動態導入避免 SSR 問題
export default dynamic(() => Promise.resolve(BlogNav), {
  ssr: false,
});
