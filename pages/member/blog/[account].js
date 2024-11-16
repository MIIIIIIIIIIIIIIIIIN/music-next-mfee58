import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./mem-blog.module.css";

import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import BlogNav from "@/components/member/blog-nav";
import PlayButton from "@/components/public/play-button";
import Logout from "@/components/public/logout";
import Link from "next/link";

const MemberBlog = () => {
  const router = useRouter();
  const [memberData, setMemberData] = useState(null); // 用於存放會員資料
  const [errorMessage, setErrorMessage] = useState(""); // 用於顯示錯誤訊息

  useEffect(() => {
    // 確保 router 已準備好且 URL 中存在 account
    if (!router.isReady || !router.query.account) {
      return;
    }

    const account = router.query.account; // 取得 URL 中的 `account`

    const fetchMemberData = async () => {
      if (!account) {
        setErrorMessage("無法取得會員帳號");
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3005/member/mem-data/${account}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        // 確認 API 回傳的資料結構
        console.log("Fetched member data:", data);
        
        if (data.success) {
          setMemberData(data.memberData); // 成功取得會員資料
        } else {
          setErrorMessage("無法取得會員資料");
        }
      } catch (error) {
        console.error("Error fetching member data:", error);
        setErrorMessage("資料讀取失敗");
      }
    };

    fetchMemberData();
  }, [router.isReady, router.query.account]); // 當 router 就緒且 `account` 更新時重新執行

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      {memberData ? (
        <>
          <Nav />

          {/* 新增連結到會員中心 */}
          <Link href="/member/member-center">
            <button>前往會員中心</button>
          </Link>

          <div className={styles["container"]}>
            <div className={styles["leftContent"]}>
              <BlogNav memberData={memberData} />
              <br />

              <Link href="/login" passHref>
                <div className={styles.logoutButton}>登出</div>
              </Link>
            </div>

            <div className={styles["rightContent"]}>
              <div className={styles["albumSec"]}>
                <div className={styles["album"]}>
                  <UserIcon />
                </div>

                <div className={styles["album"]}>
                  <PlayButton size="large" />
                </div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
                <div className={styles["album"]}>album</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>載入中...</p>
      )}
    </div>
  );
};

export default MemberBlog;
