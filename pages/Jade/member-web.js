import React from "react";
import Nav from "@/components/public/nav";
import UserIcon from "@/components/public/user-icon";
import Carousel from "@/components/public/carousel";
import FormCheckbox from "@/components/public/form-checkbox";
import FormOption from "@/components/public/form-option";
import FormInput from "@/components/public/form-input";
import PasswordInput from "@/components/public/PasswordInput";
import PlayButton from "@/components/public/play-button";
import PlayButtonS from "@/components/public/play-button-s";
import Mp3Uploader from "@/components/public/mp3-uploader";
import FormInputM from "@/components/member/form-input";
import Button from "@/components/public/buttons";
import ButtonToggleM from "@/components/member/button-show";
import InfoNav from "@/components/member/info-nav";
import MemberInfo from "@/components/member/mem-info/member-info";
import MemberAccount from "@/components/member/mem-account";
import MemberPassword from "@/components/member/mem-password";
import MemberOrder from "@/components/member/mem-order";
import MemberFav from "@/components/member/mem-fav";


export default function MemberWeb() {

  return (
    <>
      <Nav />
      <MemberInfo />
      <MemberAccount />
      <MemberPassword />
      <MemberOrder />
      <MemberFav />
    </>
  );

  
}