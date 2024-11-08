import React, { useEffect, useState } from "react";
import styles from "./blog-nav.module.css"; // 引入相應的 CSS 模組
import UserIcon from "@/components/public/user-icon";

const BlogNav = () => {
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("http://localhost:3001/mem-data", {
          credentials: "include", // 包含 cookie，確保 session 可以被讀取
        });
        const data = await response.json();
        console.log(data);

        if (data.admin) {
          setName(data.admin.nickname || "");

          // 格式化 birth 只顯示 MM-DD
          const birthDate = new Date(data.admin.birth);
          const formattedBirth = `${String(birthDate.getMonth() + 1).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
          setBirth(formattedBirth);

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
        <UserIcon />
      </div>
      <h4 className={styles["name"]}>{name}</h4>
      <div className={styles["info"]}>
        <div className="gender">其他</div>
        <div className={styles["else"]}>
          <div className="birth">{birth}</div>
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
