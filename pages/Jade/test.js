import React from "react";
import MemIcons from "@/components/member/mem-icons";
import ResetPassword from "@/components/member/reset-password";


export default function Test() {
  return (
    <>
      <h2>元件 MemIcons</h2>
      <h4>三種尺寸：16, 24, 48</h4>
      <MemIcons /> {/* 預設 icon-mail, 中尺寸 */}
      <MemIcons iconName="icon-mail" />
      <MemIcons iconName="icon-user" size="small" /> {/* 小尺寸 */}
      <MemIcons iconName="icon-user" size="medium" /> {/* 中尺寸 */}
      <MemIcons iconName="icon-user" size="large" /> {/* 大尺寸 */}
      <MemIcons iconName="icon-phone" /> {/* 預設中尺寸 */}
      <ResetPassword />
    </>
  );
}
