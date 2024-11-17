import { useEffect, useState } from "react";
import { useAuth } from "@/Context/auth-context";
import { useRouter } from "next/router";
import styles from "./mem-blog.module.css";
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "@/components/member/blog-nav";
import PlayButton from "@/components/public/play-button";
import Link from "next/link";

const MemberBlog = () => {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [memberData, setMemberData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = () => {
    router.push("/member/center");
  };
  useEffect(() => {
    if (!auth.account) {
      // setErrorMessage("無法取得有效的 account");
      router.push("/member/login");
      return;
    }

    const fetchMemberData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/member/mem-data/${auth.account}`
        );
        const data = await response.json();
        if (data.success) {
          setMemberData(data.memberData);
        } else {
          setErrorMessage("無法取得會員資料");
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        setErrorMessage("資料讀取失敗");
      }
    };

    fetchMemberData();
  }, [auth.account]); // 依赖于 account 确保数据获取仅在 account 更新时触发

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // 點擊登出按鈕後的處理
  const handleLogout = () => {
    logout(); // 執行登出
    router.push("/member/login"); // 登出後重導向到登入頁面
  };

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      {memberData ? (
        <>
          <Nav className={styles["nav"]} />

          <div className={styles["container"]}>
            <div className={styles["leftContent"]}>
              <BlogNav memberData={memberData} />
              <br />
              <div className={styles["background-pattern"]}></div>

              <div className={styles["btn"]}>
                <div className={styles.editButton} onClick={handleEdit}>
                  修改
                </div>
                <div className={styles.logoutButton} onClick={handleLogout}>
                  登出
                </div>
              </div>
            </div>

            <div className={styles["rightContent"]}>
              <div className={styles["albumSec"]}>
                <div className={styles["album"]}>
                  <UserIcon />
                </div>{" "}
                <div className={styles["album"]}>
                  <UserIcon />
                </div>{" "}
                <div className={styles["album"]}>
                  <UserIcon />
                </div>{" "}
                <div className={styles["album"]}>
                  <UserIcon />
                </div>{" "}
                <div className={styles["album"]}>
                  <UserIcon />
                </div>{" "}
                <div className={styles["album"]}>
                  <UserIcon />
                </div>
                <div className={styles["album"]}>
                  <PlayButton size="large" />
                </div>
              </div>
            </div>
          </div>
          <div className={styles["footer"]}></div>
          {/* <div className={styles.logoutButton} onClick={handleLogout}>
            登出
          </div> */}
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  );
};

export default MemberBlog;
