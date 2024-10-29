import React from "react";
import InfoNav from "@/components/member/info-nav";
import MemberInfo from "@/components/member/mem-info/member-info";
import MemberAccount from "@/components/member/mem-account";
import MemberPassword from "@/components/member/mem-password";
import MemberOrder from "@/components/member/mem-order";
import MemberFav from "@/components/member/mem-fav";
import FooterDeskTop from "@/components/public/footer/desktop";


export default function MemberWeb() {

  return (
    <>
      <MemberInfo />
      <MemberAccount />
      <MemberPassword />
      <MemberOrder />
      <MemberFav />

    </>
  );

  
}