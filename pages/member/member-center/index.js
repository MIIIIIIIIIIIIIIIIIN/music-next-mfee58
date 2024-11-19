import { useAuth } from "@/Context/auth-context"; // 使用 useAuth 來取得 auth 和 logout
import { useRouter } from "next/router";
import { useEffect } from "react";

const MemberCenter = () => {
  const { auth, logout } = useAuth(); // 取得 logout 函數
  const router = useRouter();

  useEffect(() => {
    if (!auth.token) {
      router.push("/member/login"); // 未登入則導向登入頁
    }
  }, [auth, router]);

  const handleLogout = () => {
    logout(); // 執行登出
    router.push("/member/login"); // 登出後導向登入頁面
  };

  return auth.token ? (
    <div>
      <h1>會員中心</h1>
      <div className="member-center">123</div>
      {/* 添加登出按鈕 */}
      <button onClick={handleLogout}>登出</button>
      {/* 顯示其他會員中心內容 */}
    </div>
  ) : null;
};

export default MemberCenter;
