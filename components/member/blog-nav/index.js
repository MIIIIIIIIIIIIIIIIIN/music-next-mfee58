import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css"; // 引入相應的 CSS 模組
import { ProfileIcons } from "@/components/public/profileIcons/ProfileIcons";

const BlogNav = () => {
  const [member, setMember] = useState({});
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("http://localhost:3005/mem-data", {
          credentials: "include", // 包含 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        console.log(data);
        setMember(data.admin || {}); // 如果 data.admin 為 undefined，設為空物件

        if (data.admin) {
          // 確保讀取 admin 裡的 nickname
          setName(data.admin.nickname || "");

          // 設置性別
          setGender(data.admin.gender || "");

          // 格式化 birth 只顯示 MM-DD
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
          setBirth(formattedBirth);

          // 設置地區
          setLocation(data.admin.location || "");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <div className={styles["blogNav"]}>
      <div className={styles["icon"]}>
        <ProfileIcons
          property1="lg"
          className={styles.header}
          img={member.icon || "/image/img-Jade/default.jpg"} // 預設圖示
        />
      </div>
      <h4 className={styles["name"]}>{name}</h4>
      <div className={styles["info"]}>
        <div className="gender">{gender}</div>
        <div className={styles["else"]}>
          <div className={styles["birth"]}>{birth}</div>
          <div className="location">{location}</div>
        </div>
      </div>
      <div className={styles["status"]}>
        <h7>Love & Peace</h7>
      </div>
    </div>
  );
};

export default BlogNav;
